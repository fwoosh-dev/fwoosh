import { promises as fs } from "fs";
import ms from "pretty-ms";
import boxen from "boxen";
import path from "path";
import { createServer, InlineConfig, build, Alias } from "vite";
import express from "express";
import expressWs from "express-ws";
import { createRequire } from "module";
import {
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
  SyncWaterfallHook,
} from "tapable";
import { remarkCodeHike } from "@code-hike/mdx";
import mdx from "@mdx-js/rollup";
import { checkLink, log, sortTree } from "@fwoosh/utils";
import bodyParser from "body-parser";
import terminalLink from "terminal-link";
import open from "better-opn";
import { h } from "hastscript";
import { Element } from "hast";
import { visit } from "unist-util-visit";
import handler from "serve-handler";
import http from "http";
import { chromium } from "playwright";

import remarkFrontmatter from "remark-frontmatter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkSlug from "remark-slug";
import toc from "@jsdevtools/rehype-toc";
import rehypeInferTitleMeta from "rehype-infer-title-meta";

import { endent } from "./utils/endent.js";
import type {
  FwooshClass,
  FwooshHooks,
  FwooshOptionsLoaded,
  FwooshOptionWithCLIDefaults,
  Plugin,
} from "@fwoosh/types";
import {
  createVirtualStoriesFile,
  storyListPlugin,
} from "./utils/story-list-plugin/index.js";
import { renderStoryPlugin } from "./utils/render-story-plugin.js";
import { getDocsPlugin } from "./utils/get-docs-plugin/index.js";
import { fwooshSetupPlugin } from "./utils/fwoosh-setup-plugin.js";
import { fwooshConfigPlugin } from "./utils/fwoosh-config-plugin.js";
import { fwooshUiPlugin } from "./utils/fwoosh-ui-plugin.js";
import { convertMarkdownToHtml, getStoryList } from "./utils/get-stories.js";
import { getCodeHikeConfig, setSyntaxTheme } from "./utils/code-hike-config.js";
import { componentOverridePlugin } from "./utils/component-override-plugins.js";
import { perfLog } from "./utils/performance.js";

const require = createRequire(import.meta.url);

interface WatchPagesOptions {
  port: number;
}

interface BuildOptions {
  outDir: string;
}

interface ServeOptions {
  outDir: string;
  open?: boolean;
}

function printBox(message: string) {
  console.log(
    boxen(message, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "green",
      titleAlignment: "center",
      textAlignment: "center",
    })
  );
}

export class Fwoosh implements FwooshClass {
  /** User's fwoosh options */
  public options: FwooshOptionsLoaded;

  /** Places for plugins to "tap" to add to or modify fwoosh's functionality */
  public hooks: FwooshHooks;

  constructor({ theme, ...options }: FwooshOptionWithCLIDefaults) {
    this.options = {
      docgen: {},
      syntaxTheme: "github-dark-dimmed",
      componentOverrides: undefined,
      title: "Fwoosh",
      setup: "",
      open: false,
      includeMdxInWorkbench: false,
      basename: "/",
      modifyViteConfig: (config) => config,
      ...options,
      sortSidebarItems: (a, b) => {
        const userSort = options.sortSidebarItems
          ? options.sortSidebarItems(a, b)
          : undefined;

        if (typeof userSort === "number") {
          return userSort;
        }

        // Keep stories sorted by order they were defined
        if (a.type === "story" && b.type === "story") {
          return 0;
        }

        // Render stories/mdx before trees
        if (a.type === "tree" && b.type === "story") {
          return 1;
        }

        if (b.type === "tree" && a.type === "story") {
          return -1;
        }

        // Default to sorting by name
        return a.name.localeCompare(b.name);
      },
    };

    setSyntaxTheme(this.options.syntaxTheme);

    if (theme) {
      if (Array.isArray(theme)) {
        this.options.themes = theme;
      } else if (typeof theme === "object") {
        this.options.themes = [theme];
      } else {
        const loaded = require(theme);

        if (Array.isArray(loaded)) {
          this.options.themes = loaded;
        } else if (typeof loaded === "object") {
          this.options.themes = [loaded.themes];
        } else {
          throw new Error(
            `Invalid theme. Expected an array or object, got ${JSON.stringify(
              loaded,
              null,
              2
            )}`
          );
        }
      }
    } else {
      this.options.themes = [];
    }

    log.info("Loaded options:", this.options);

    this.hooks = {
      registerPanel: new SyncWaterfallHook(["panels"]),
      registerToolbarControl: new SyncWaterfallHook(["toolbarControls"]),
      renderStory: new AsyncSeriesBailHook(),
      generateDocs: new AsyncSeriesBailHook(["pathToFile"]),
      modifyViteConfig: new AsyncSeriesWaterfallHook(["config"]),
    };

    this.hooks.registerPanel.intercept({
      result: (result) => {
        log.info(
          "Registered panels:\n",
          result
            .map((i, index) => {
              const indent = index === 0 ? " " : "  ";
              return `${indent}-  ${terminalLink(i.name, i.filepath)}`;
            })
            .join("\n")
        );
      },
    });

    this.hooks.registerToolbarControl.intercept({
      result: (result) => {
        log.info(
          "Registered toolbars:\n",
          result
            .map((i, index) => {
              const indent = index === 0 ? " " : "  ";
              return `${indent}-  ${terminalLink(i.name, i.filepath)}`;
            })
            .join("\n")
        );
      },
    });
  }

  async loadPlugins() {
    const plugins: Plugin[] = [];

    await Promise.all(
      (this.options.plugins || []).map(async (pluginConfig) => {
        if (typeof pluginConfig === "object" && "name" in pluginConfig) {
          plugins.push(pluginConfig);
        } else {
          const [name, options] =
            typeof pluginConfig === "string"
              ? [pluginConfig, {}]
              : pluginConfig;

          let Plugin;

          try {
            ({ default: Plugin } = await import(`${name}/plugin.js`));
          } catch (e) {
            if (
              e &&
              typeof e === "object" &&
              "code" in e &&
              e.code !== "ERR_MODULE_NOT_FOUND"
            ) {
              throw e;
            }
          }

          if (!Plugin) {
            ({ default: Plugin } = await import(name));
          }

          if (!Plugin) {
            throw new Error(`Could not find plugin ${name}`);
          }

          plugins.push(new Plugin(options));
        }
      })
    );

    plugins.forEach((plugin) => {
      plugin.apply(this);
    });
  }

  async getViteConfig({
    port = 3000,
    outDir,
    mode,
  }: Partial<WatchPagesOptions> &
    Partial<BuildOptions> & { mode: "development" | "production" }) {
    const toolbarControls = this.hooks.registerToolbarControl.call([]);
    const panels = this.hooks.registerPanel.call([]);
    const includedHeadings = ["h2", "h3", "h4", "h5", "h6"];
    const depsToOptimize = [
      "react-query",
      "react-helmet-async",
      "command-score",
      "mousetrap",
      "react",
      "react-dom",
      "react-dom/client",
      "prop-types",
      "@devtools-ds/themes",
      "@devtools-ds/tree",
      "@devtools-ds/object-inspector",
      "escape-html",
      "react-router",
      "react-router-dom",
      "debounce",
      "react/jsx-runtime",
      "hoist-non-react-statics",
      "fast-deep-equal",
      "fast-deep-equal/react",
      "use-sync-external-store/shim",
      "consola",
      "lodash.chunk",
      "@mdx-js/react",
    ];

    process.env.NODE_ENV = mode;
    process.env.FWOOSH_DEV_SERVER_PORT = String(port);

    const optimizedDeps = depsToOptimize.filter((d) => {
      try {
        // Test if the dependency is installed
        // Fixes warning for different versions of react-dom not being installed
        return require.resolve(d);
      } catch (e) {}
    });

    const stories = await getStoryList(this.options);

    const baseConfig: InlineConfig = {
      mode,
      root: path.dirname(path.dirname(require.resolve("@fwoosh/app"))),
      base: mode === "production" ? this.options.basename : "/",
      plugins: [
        mdx({
          remarkPlugins: [
            remarkFrontmatter,
            remarkSlug,
            [remarkCodeHike, getCodeHikeConfig()],
          ],
          rehypePlugins: [
            rehypeInferTitleMeta,
            // Inline data from above plugins into the page
            () => {
              return (tree, file) => {
                tree.children.push(
                  h(
                    "script",
                    {
                      id: "html-metadata",
                      type: "application/json",
                    },
                    JSON.stringify(file.data)
                  )
                );
              };
            },
            // Check validity of links during build
            () => {
              if (mode !== "production") {
                return () => {};
              }

              const storiesPromise = createVirtualStoriesFile(this.options);

              return async (tree, file) => {
                const stories = await storiesPromise;
                const errors: string[] = [];

                visit(
                  tree,
                  "mdxJsxTextElement",
                  (node: {
                    name: string;
                    attributes: { name: string; value: string }[];
                  }) => {
                    if (node.name !== "Link") {
                      return;
                    }

                    const to = node.attributes.find(
                      (attr) => attr.name === "to"
                    )?.value;

                    if (!to) {
                      throw new Error('Link is missing a "to" attribute');
                    }

                    try {
                      checkLink(to, stories.fileMap, stories.tree);
                    } catch (error) {
                      errors.push((error as Error).message);
                    }
                  }
                );

                if (errors.length) {
                  console.log(`\nFound invalid links in: ${file.path}\n`);
                  console.log(errors.join("\n"));
                  process.exit(1);
                }
              };
            },
            [
              rehypeAutolinkHeadings,
              {
                behavior: "before",
                test: includedHeadings,
                group(el: any) {
                  return h("div", {
                    "data-link-group": true,
                    style: { position: "relative" },
                    "data-level": parseInt(el.tagName.replace("h", "")),
                    "data-level-id": el.properties.id,
                  });
                },
                properties: {
                  "data-link-icon": true,
                },
                content: (node: Element) =>
                  h(
                    "span.visually-hidden",
                    "Link to the '",
                    String(node),
                    "' section"
                  ),
              },
            ],
            [
              toc,
              {
                headings: includedHeadings,
              },
            ],
          ],
          providerImportSource: "@mdx-js/react",
        }),
        fwooshSetupPlugin({ file: this.options.setup }),
        fwooshUiPlugin({ toolbarControls, panels }),
        fwooshConfigPlugin(this.options),
        getDocsPlugin({
          port,
          generateDocs: (file) => this.hooks.generateDocs.promise(file),
          ...this.options.docgen,
        }),
        storyListPlugin(this.options),
        renderStoryPlugin(await this.hooks.renderStory.promise()),
        componentOverridePlugin(this.options),
        {
          name: "fwoosh:404",
          enforce: "post",
          writeBundle: async () => {
            if (!outDir) {
              return;
            }

            const pathOf404 = path.join(outDir, "404.html");
            const contentsOf404 = await fs.readFile(pathOf404, "utf8");

            await fs.writeFile(
              pathOf404,
              contentsOf404.replace(
                "process.env.FWOOSH_PATH_SEGMENTS_TO_KEEP",
                String(this.options.basename.split("/").filter(Boolean).length)
              )
            );
          },
        },
        // This plugin is used to alias react-dom/client to a placeholder
        // when it's not installed. This is to prevent the build from failing
        // when react 18 is not installed.
        //
        // I couldn't find a way to do this with the alias option so this mirrors roughly
        // what the alias plugin does.
        {
          name: "fwoosh:react-alias",
          resolveId(importee, importer) {
            if (!importer) {
              return null;
            }

            if (importee === "react-dom/client") {
              try {
                require.resolve("react-dom/client");
              } catch (e) {
                return require.resolve("./react18-placeholder.js");
              }
            }
          },
        },
      ],
      optimizeDeps: {
        entries: [
          require.resolve("@fwoosh/app/index.html"),
          ...stories.map((s) => path.resolve(s)),
          ...panels.map((p) => p.filepath),
          ...toolbarControls.map((p) => p.filepath),
        ],
        exclude: ["@fwoosh/*", "@fwoosh/components", "@fwoosh/hooks"],
        include: optimizedDeps,
      },
      build: {
        outDir,
        emptyOutDir: true,
      },
      server: {
        port,
        middlewareMode: true,
        fs: {
          strict: false,
        },
      },
      define: {
        "process.env.FWOOSH_DEV_SERVER_PORT": `${port}`,
        "process.env.LOG_LEVEL": `"${process.env.LOG_LEVEL}"`,
        "process.env.FWOOSH_BASE_NAME": `"${
          mode === "production" ? this.options.basename : "/"
        }"`,
      },
      resolve: {
        alias: [
          {
            find: "react-router",
            replacement: require.resolve("react-router", {
              paths: [require.resolve("@fwoosh/app")],
            }),
          },
          {
            find: "react-router-dom",
            replacement: require.resolve("react-router-dom", {
              paths: [require.resolve("@fwoosh/app")],
            }),
          },
        ],
      },
    };

    const configWithPluginModifications =
      await this.hooks.modifyViteConfig.promise(baseConfig);

    return this.options.modifyViteConfig(configWithPluginModifications);
  }

  /** Clean up all the output files */
  async clean() {
    try {
      await fs.stat(this.options.outDir);

      await Promise.all([
        fs.rm(this.options.outDir, { recursive: true, force: true }),
      ]);
    } catch (e) {
      log.warn("No output directory found, skipping clean");
    }
  }

  /** Do a production build of the website */
  async build({ outDir }: BuildOptions) {
    const config = await this.getViteConfig({ outDir, mode: "production" });

    await build(config);

    this.serve({ outDir }, async (server) => {
      const stories = await createVirtualStoriesFile(this.options);
      const mdx = Object.values(stories.fileMap).filter(
        (i) =>
          i.type === "mdx" && !JSON.parse(i.meta as unknown as string).skipIndex
      );

      log.log("Building search data for MDX files...");

      const browser = await chromium.launch();
      const searchData: Record<string, any> = {};

      for (const file of mdx) {
        log.info("Building search data:", file.title);

        const page = await browser.newPage();
        const url = `http://localhost:3000${path.join(
          this.options.basename,
          "docs",
          file.slug
        )}`;

        await page.goto(url);

        // This makes use wait for the page to load
        await new Promise<void>((res) => {
          page.on("console", async (msg) => {
            const msgArgs = msg.args();

            if (msgArgs.length !== 3) {
              return;
            }

            const firstMsg = await msgArgs[0].jsonValue();

            if (firstMsg !== "window.FWOOSH_SEARCH_INDEX") {
              return;
            }

            const slug = await msgArgs[1].jsonValue();
            const data = await msgArgs[2].jsonValue();

            searchData[slug as string] = data;
            res();
          });
        });
      }

      await fs.writeFile(
        path.join(outDir, "search.json"),
        JSON.stringify(searchData)
      );

      const canvas = await browser.newPage();

      await canvas.evaluate(() => {
        // @ts-ignore
        window.isMeasuring = true;
      });

      log.log("Measuring workbench canvas...");

      const [shapes] = await Promise.all([
        new Promise<Record<string, unknown>>((res) => {
          canvas.on("console", async (msg) => {
            const msgArgs = msg.args();

            if (msgArgs.length !== 2) {
              return;
            }

            const firstMsg = await msgArgs[0].jsonValue();

            if (firstMsg !== "window.FWOOSH_CANVAS_SHAPE") {
              return;
            }

            const data = await msgArgs[1].jsonValue();
            Object.values(data).forEach((item) => {
              if ((item as any).story) {
                delete (item as any).story.code;
                delete (item as any).story.comment;
              }
            });
            res(data);
          });
        }),
        canvas.goto(
          `http://localhost:3000${path.join(
            this.options.basename,
            "canvas/workbench"
          )}`
        ),
      ]);

      log.log("Measuring docs canvas...");

      const [docsShapes] = await Promise.all([
        new Promise<Record<string, unknown>>((res) => {
          canvas.on("console", async (msg) => {
            const msgArgs = msg.args();

            if (msgArgs.length !== 2) {
              return;
            }

            const firstMsg = await msgArgs[0].jsonValue();

            if (firstMsg !== "window.FWOOSH_CANVAS_SHAPE") {
              return;
            }

            const data = await msgArgs[1].jsonValue();
            Object.values(data).forEach((item) => {
              if ((item as any).story) {
                delete (item as any).story.code;
                delete (item as any).story.comment;
              }
            });
            res(data);
          });
        }),
        canvas.goto(
          `http://localhost:3000${path.join(
            this.options.basename,
            "canvas/docs"
          )}`
        ),
      ]);

      await fs.writeFile(
        path.join(outDir, "assets", "shapes.js"),
        endent`
          window.FWOOSH_WORKBENCH_CANVAS_SHAPES = ${JSON.stringify(shapes)};
          window.FWOOSH_DOCS_CANVAS_SHAPES = ${JSON.stringify(docsShapes)};
        `
      );

      await browser.close();
      server.close();

      log.success("Build complete!");
    });
  }

  /** Run a server a production build of the website */
  async serve(
    { outDir }: ServeOptions,
    onReady?: (server: http.Server) => void
  ) {
    const server = http.createServer((request, response) => {
      return handler(request, response, {
        public: outDir,
        rewrites: [
          {
            source: "fwoosh/assets/:id",
            destination: "assets/:id",
          },
          {
            source: "!assets/**",
            destination: "index.html",
          },
        ],
      });
    });

    server.listen(3000, () => {
      const url = `http://localhost:${path.join(
        `${3000}`,
        this.options.basename,
        "workbench"
      )}`;

      printBox(`fwoosh served at ${url}`);

      if (this.options.open) {
        open(url);
      }

      onReady?.(server);
    });
  }

  /** Start the development server */
  async dev({ port }: WatchPagesOptions = { port: 3000 }) {
    const app = express();
    const ws = expressWs(app);
    const viteConfig = await this.getViteConfig({
      mode: "development",
      port,
    });
    const vite = await createServer({
      ...viteConfig,
      assetsInclude: ["**/*.html"],
    });

    log.trace("Loaded vite with config:", vite.config);

    app.head("*", async (_, res) => res.sendStatus(200));

    ws.app.ws("/get-docs", async (ws) => {
      ws.on("message", async (message: string) => {
        const file = message
          .replace("http://localhost:3000/@fs", "")
          .replace("/dist/", "/src/")
          .replace(".js", ".tsx");

        const generateDocsTimerEnd = perfLog(
          `Generate docs: ${path.relative(process.cwd(), file)}`
        );
        const docs = await this.hooks.generateDocs.promise(file);
        generateDocsTimerEnd();

        const docsWithHtmlDescriptions = await Promise.all(
          docs.map(async (doc) => ({
            ...doc,
            description: await convertMarkdownToHtml(doc.description),
          }))
        );

        ws.send(JSON.stringify(docsWithHtmlDescriptions));
      });
    });

    ws.app.ws("/get-mdx-content", async (ws) => {
      ws.on("message", async (message: string) => {
        ws.send(await convertMarkdownToHtml(message));
      });
    });

    app.use(express.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
    app.use(bodyParser.json());

    ws.app.ws("/sort", (ws) => {
      ws.on("message", (message) => {
        const result = sortTree(
          JSON.parse(message.toString()),
          this.options.sortSidebarItems
        );

        ws.send(JSON.stringify(result));
      });
    });

    app.use(bodyParser.text());
    app.post("/highlight-code", async (req, res) => {
      const markdown = endent`
        \`\`\`tsx
        ${req.body}
        \`\`\`
      `;
      const html = await convertMarkdownToHtml(markdown);
      res.json({ html });
    });

    app.use(vite.middlewares);

    app.listen(port, async () => {
      printBox(`fwoosh served at http://localhost:${port}/workbench`);

      if (this.options.open) {
        process.env.OPEN_MATCH_HOST_ONLY = "true";
        open(`http://localhost:${port}/${this.options.open}`);
      }
    });
  }
}
