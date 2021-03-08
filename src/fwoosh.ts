import { AsyncSeriesWaterfallHook } from "tapable";
import { promises as fs } from "fs";
import esbuild from "esbuild";
import * as path from "path";
import exec from "execa";
import ansi from "ansi-colors";
import glob from "fast-glob";
import chokidar from "chokidar";
import ora from "ora";
import liveServer from "live-server";
import open from "open";
import http from "http";
import ms from "pretty-ms";

import { createProcessor } from "xdm";
import gfm from "remark-gfm";
import shiki from "rehype-shiki-reloaded";

import { getCacheDir } from "./utils/get-cache-dir.js";
import * as mdxPlugin from "./utils/mdx-plugin.js";
import { endent } from "./utils/endent.js";
import { exists } from "./utils/exists.js";

import UserLayoutsPlugin from "./plugins/user-layouts.js";
import PublicAssetsPlugin from "./plugins/public-assets.js";
import UserComponentsPlugin from "./plugins/user-components.js";
import { officialPlugins } from "./plugins/index.js";

import type { Asset, FrontMatter, Layout } from "./types";

interface PageBuild {
  pages: string[];
  frontMatters: FrontMatter[];
  rebuild: () => Promise<void>;
}

interface WatchPagesOptions {
  port: number;
}

// @ts-ignore
const { redBright, bold, greenBright, underline, green } = ansi;

const processor = createProcessor({
  remarkPlugins: [gfm],
  rehypePlugins: [
    [
      (shiki as any).default,
      {
        theme: "github-light",
        darkTheme: "github-dark",
      },
    ],
  ],
});

/** Display a build speed message */
const makeBuildMessage = (pagePath: string, time: number, rebuild = false) => {
  return `${rebuild ? "Rebuild" : "Built"} ${bold(
    `"${pagePath}"`
  )}, took ${green(ms(time / 1000000))}`;
};

interface FwooshHooks {
  /** Add assets to the public directory. */
  addAssets: AsyncSeriesWaterfallHook<[Asset[]]>;
  /** Add layouts for pages */
  registerLayouts: AsyncSeriesWaterfallHook<[Layout[]]>;
  /** Register files with component overrides */
  registerComponents: AsyncSeriesWaterfallHook<[string[]]>;
  /** Process the output html for server rendered pages */
  processPage: AsyncSeriesWaterfallHook<[string]>;
}

export interface FwooshOptions {
  /** the directory with the mdx pages */
  dir: string;
  /** the directory with the mdx pages */
  outDir: string;
  /** Plugins applied to this fwoosh instance, contains default plugins */
  plugins: Array<string | [name: string, options: Record<string, unknown>]>;
}

export class Fwoosh {
  /** User's fwoosh options */
  public options: Required<FwooshOptions>;
  /** All of the layouts registered with this fwoosh website */
  private layouts?: Layout[];

  /** Places for plugins to "tap" to add to or modify fwoosh's functionality */
  hooks: FwooshHooks = {
    processPage: new AsyncSeriesWaterfallHook(["page"]),
    registerLayouts: new AsyncSeriesWaterfallHook(["layouts"]),
    registerComponents: new AsyncSeriesWaterfallHook(["components"]),
    addAssets: new AsyncSeriesWaterfallHook(["assets"]),
  };

  constructor(options: FwooshOptions) {
    this.options = options;
  }

  loadPlugins = async () => {
    const plugins = [new UserLayoutsPlugin(), new PublicAssetsPlugin()];

    await Promise.all(
      this.options.plugins.map(async (pluginConfig) => {
        const [name, options] =
          typeof pluginConfig === "string" ? [pluginConfig, {}] : pluginConfig;

        const Plugin =
          name in officialPlugins
            ? officialPlugins[name as keyof typeof officialPlugins]
            : await import(name);

        plugins.push(new Plugin(options));
      })
    );

    // User components should override all other registered components
    plugins.push(new UserComponentsPlugin())

    plugins.forEach((plugin) => {
      plugin.apply(this);
    });
  };

  /** Get the user registered layouts. */
  private async getLayouts() {
    if (this.layouts) {
      return this.layouts;
    }

    const layouts = await this.hooks.registerLayouts.promise([]);
    this.layouts = layouts;
    return layouts;
  }

  /** Get a specific layout */
  async getLayout(name: string) {
    const layouts = await this.getLayouts();
    const layout = layouts.find((layout) => layout.name === name);

    if (!layout) {
      throw new Error(
        `You specified a layout in a that isn't registered! ${layout}`
      );
    }
  }

  /** Clean up all the output files */
  async clean() {
    await Promise.all([
      fs.rm(this.options.outDir, { recursive: true, force: true }),
      fs.rm(getCacheDir(), { recursive: true, force: true }),
    ]);
  }

  /** Do a production build of the website */
  async build() {
    const pages = await glob(
      path.join(this.options.dir, "**/*.{mdx,jsx,tsx}"),
      {
        ignore: ["**/out/**", path.join(this.options.dir, "/layouts/**")],
      }
    );

    if (!pages.length) {
      console.log(
        `${bold(redBright("Uh oh!"))} No pages were found in "${
          this.options.dir
        }"`
      );
      return;
    }

    console.log(`${greenBright(bold("Building all pages"))}`);

    const builder = await this.buildPage(pages);
    const assets = await this.hooks.addAssets.promise([]);

    await Promise.all(assets.map((asset) => this.copyAsset(asset)));

    return builder;
  }

  /** Start the development server */
  async dev(options: WatchPagesOptions = { port: 3000 }) {
    return new Promise<void>(async (resolve, reject) => {
      const spinner = ora(`🏃‍♂ fwoosh`).start();
      const builders: PageBuild[] = [];
      const layouts = await this.getLayouts();

      chokidar
        .watch(`${this.options.dir}/**`, {
          interval: 0, // No delay
          ignored: ["**/out"],
        })
        .on("change", async (changePath) => {
          const assets = await this.hooks.addAssets.promise([]);
          const buildAsset = assets.find((asset) =>
            changePath.includes(asset.path)
          );

          if (buildAsset) {
            await this.copyAsset(buildAsset);
            spinner.text = `${green("Moved")} ${buildAsset.path}`;
            return;
          }

          const layout = layouts.find((l) => changePath.includes(l.path));
          const cachedBuilders = builders.filter(
            (b) =>
              b.pages.includes(changePath) ||
              (layout &&
                b.frontMatters.some((f) => {
                  return f.layout === layout.name;
                }))
          );

          await Promise.all(
            cachedBuilders.map(async (cachedBuilder) => {
              const start = process.hrtime();
              await cachedBuilder.rebuild();
              const end = process.hrtime(start);
              spinner.text = makeBuildMessage(changePath, end[1], true);
            })
          );
        });

      const server = (liveServer.start({
        open: false,
        port: options.port,
        root: this.options.outDir,
        // @ts-ignore
        watch: this.options.outDir,
        logLevel: 0,
        middleware: [
          async ({ url }, res: http.ServerResponse, next) => {
            if (url.includes(".html")) {
              const file = url.replace(".html", ".{mdx,tsx,jsx}");
              const pageGlob = path.join(this.options.dir, file);
              const pagePath = (await glob(pageGlob))[0];
              const cachedBuilder = builders.find((b) =>
                b.pages.includes(pagePath)
              );

              // Since we also have a file watcher going we don't need build any
              // pages on request if they already been built. The will be taken care
              // of by chokidar
              if (cachedBuilder) {
              } else {
                const start = process.hrtime();
                spinner.start(`Building ${url}...`);

                const builder = await this.buildPage([pagePath], true);
                builders.push(builder);

                const end = process.hrtime(start);
                spinner.text = makeBuildMessage(pagePath, end[1]);
              }
            }

            next();
          },
        ],
      }) as unknown) as http.Server;

      server.on("listening", () => {
        const firstPageUrl = `http://localhost:${options.port}/index.html`;
        spinner.succeed(`Ready on ${underline(firstPageUrl)}`);
        open(firstPageUrl);
      });

      server.on("error", (error) => {
        reject(error);
      });

      server.on("close", () => {
        resolve();
      });
    });
  }

  /** Run esbuild, returns a incremental builder */
  private async runEsBuild(esBuildOptions: esbuild.BuildOptions) {
    process.env.NODE_ENV = "development";

    const dirname = path.dirname(import.meta.url.replace("file://", ""));
    const frontMatters: any[] = [];
    const layouts = await this.getLayouts();

    /** A plugin that parses MDX and Front Matters */
    const frontMatterPlugin: esbuild.Plugin = {
      name: "front-matter",
      setup(build) {
        // When a URL is loaded, we want to actually download the content
        // from the internet. This has just enough logic to be able to
        // handle the example import from unpkg.com but in reality this
        // would probably need to be more complex.
        build.onLoad({ filter: /\.mdx$/ }, async (args) => {
          const value = await mdxPlugin.onload(processor, args, layouts);
          frontMatters.push(value.pluginData.frontMatter);
          return value;
        });

        // Also want to add the front matter to tsx/jsx files that don't have one
        build.onLoad({ filter: /\.(jsx|tsx)$/ }, async (args) => {
          const contents = await fs.readFile(args.path, "utf8");
          const frontMatter = contents.match(/^export const frontMatter/gm)
            ? ""
            : `export const frontMatter = {};`;

          return {
            loader: args.path.endsWith("jsx") ? "jsx" : "tsx",
            contents: endent`
              ${frontMatter}

              ${contents}
            `,
          };
        });
      },
    };

    /** A plugin that creates a fake entry point to load registered fwoosh components */
    const fwooshComponents: esbuild.Plugin = {
      name: "fwoosh-components",
      setup: (build) => {
        build.onResolve({ filter: /^fwoosh\/components$/ }, async (args) => {
          return {
            path: args.path,
            namespace: "fwoosh-components",
          };
        });

        build.onLoad({ filter: /^fwoosh\/components$/ }, async (args) => {
          const userComponents = await this.hooks.registerComponents.promise(
            []
          );
          const userImports = userComponents.map(
            (userComponent, index) =>
              `import { components as components${index} } from "${userComponent}";`
          );

          return {
            loader: "tsx",
            resolveDir: path.dirname(args.path),
            contents: endent`
              import { components as defaultComponents } from "${path
                .join(path.dirname(import.meta.url), "components/components.js")
                .replace("file:", "")}";
              ${userImports.join("\n")}

              export const components = {
                ...defaultComponents,
                ${userImports.map((_, index) => `...components${index},`)}
              }

              export type Components = typeof components;
            `,
          };
        });
      },
    };

    const buildResult = await esbuild.build({
      bundle: true,
      splitting: true,
      format: "esm",
      define: {
        "process.env.NODE_ENV": JSON.stringify("development"),
      },
      inject: [path.join(dirname, "../src/utils/react-shim.js")],
      plugins: [frontMatterPlugin, fwooshComponents],
      ...esBuildOptions,
    });

    return { ...buildResult, frontMatters };
  }

  /** Transform a user page into a static page */
  private async buildPage(pages: string[], watch = false): Promise<PageBuild> {
    const cacheDir = getCacheDir()!;
    const virtualServerPages: string[] = [];
    const virtualClientPages: string[] = [];

    await Promise.all(
      pages.map(async (page) => {
        // Path to tmp file in cached build dir
        const virtualServerPagePath = path.join(
          cacheDir,
          path.relative(this.options.dir, page).replace(/\.\S+$/, ".js")
        );
        virtualServerPages.push(virtualServerPagePath);
        const browserJs = path
          .relative(this.options.dir, page)
          .replace(/\.\S+$/, "-client.js");
        const virtualBrowserPagePath = path.join(cacheDir, browserJs);
        virtualClientPages.push(virtualBrowserPagePath);

        await fs.mkdir(path.dirname(virtualServerPagePath), {
          recursive: true,
        });

        // Render the page
        await fs.writeFile(
          virtualServerPagePath,
          endent`
            import * as React from 'react'
            import * as Server from 'react-dom/server'
            import { Document } from "fwoosh"
            import { components } from "fwoosh/components"
  
            import Page, { frontMatter } from "${path
              .resolve(page)
              .replace("/index.tsx", "")}";
            
            console.log(Server.renderToString((
              <Document attach="${browserJs}" frontMatter={frontMatter}>
                <Page components={components} />
              </Document>
            )))
          `
        );

        // For client hydration
        await fs.writeFile(
          virtualBrowserPagePath,
          endent`
            import * as React from 'react'
            import * as ReactDOM from 'react-dom'
            import { Document } from "fwoosh"
            import { components } from "fwoosh/components"
  
            import Component from "${path
              .resolve(page)
              .replace("/index.tsx", "")}";
            
            ReactDOM.hydrate(
              <Component components={components} />,
              document.getElementById("root")
            )
          `
        );
      })
    );

    const moveFilesToOut = async (outdir: string) => {
      // SSR all pages
      await Promise.all(
        pages.map(async (page) => {
          const { name, dir } = path.parse(
            path.relative(this.options.dir, page)
          );
          const outfile = path.join(outdir, dir, `${name}.js`);
          await this.generatePage(page, outfile);
        })
      );

      // Copy client hydration code to outDir
      await Promise.all(
        virtualClientPages.map(async (page) => {
          const filePath = path.join(
            path.dirname(path.relative(cacheDir, page)),
            `${path.basename(page)}`
          );
          const clientJs = path.join(outdir, filePath);

          await fs.copyFile(clientJs, path.join(this.options.outDir, filePath));
        })
      );

      // Copy all shared chunks to outDir
      const chunks = await glob(path.join(outdir, "**/chunk.*"));

      await Promise.all(
        chunks.map(async (chunk) => {
          const chunkPath = path.relative(outdir, chunk);

          await fs.copyFile(
            path.join(outdir, chunkPath),
            path.join(this.options.outDir, chunkPath)
          );
        })
      );
    };

    try {
      const outdir = path.join(cacheDir, "build");
      const mockPackage = path.join(outdir, "package.json");

      if (!(await exists(mockPackage))) {
        await fs.mkdir(path.dirname(mockPackage), { recursive: true });
        // fake out node into thinking the node_modules/.cache is a module
        await fs.writeFile(mockPackage, '{ "type": "module" }');
      }

      // Build the tmp build file in the cache
      const builder = await this.runEsBuild({
        outdir,
        entryPoints: [...virtualClientPages, ...virtualServerPages],
        incremental: watch === true,
        loader: {
          ".js": "jsx",
        },
      });

      await moveFilesToOut(outdir);

      return {
        pages,
        frontMatters: builder.frontMatters,
        rebuild: async () => {
          if (builder.rebuild) {
            await builder.rebuild();
            await moveFilesToOut(outdir);
          }
        },
      };
    } catch (error) {
      console.log(redBright("Error"), error);
      process.exit(1);
    }
  }

  /** SSR a page to HTML */
  private async generatePage(page: string, file: string) {
    // Get the output HTML of the page
    const { stdout } = await exec("node", [file]);
    const htmlPagePath = path.join(
      this.options.outDir,
      path.dirname(path.relative(this.options.dir, page)),
      `${path.parse(page).name}.html`
    );

    const markup = await this.hooks.processPage.promise(stdout);

    // Write the HTML page to the output folder
    await fs.mkdir(path.dirname(htmlPagePath), { recursive: true });
    await fs.writeFile(
      htmlPagePath,
      endent`
        <!DOCTYPE html />
        ${markup}
      `
    );
  }

  /** Copy an asset to the output folder */
  private copyAsset(asset: Asset) {
    const dest = path.join(
      this.options.outDir,
      path.relative(asset.folder, asset.path)
    );

    return fs.copyFile(asset.path, dest);
  }
}

/** A fwoosh plugin */
export interface Plugin {
  /** The name of the plugin */
  name: string;
  /** Hook into fwoosh */
  apply(fwoosh: Fwoosh): void;
}

export type { Asset, FrontMatter, Layout } from "./types";
