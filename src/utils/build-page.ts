import esbuild from "esbuild";
import * as path from "path";
import exec from "execa";
import fs from "fs-extra";
import findCacheDir from "find-cache-dir";
import ansi from "ansi-colors";
import glob from "fast-glob";

import { createProcessor } from "xdm";
import gfm from "remark-gfm";
import shiki from "rehype-shiki-reloaded";

import * as mdxPlugin from "./mdx-plugin.js";
import { endent } from "./endent.js";

// @ts-ignore
const { redBright, bold, greenBright } = ansi;

const frontMatterPlugin: esbuild.Plugin = {
  name: "front-matter",
  setup(build) {
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

    // When a URL is loaded, we want to actually download the content
    // from the internet. This has just enough logic to be able to
    // handle the example import from unpkg.com but in reality this
    // would probably need to be more complex.
    build.onLoad({ filter: /\.mdx$/ }, async (args) => {
      return mdxPlugin.onload(processor, args);
    });
  },
};

const build = (options: esbuild.BuildOptions) => {
  process.env.NODE_ENV = "development";

  const dirname = path.dirname(import.meta.url.replace("file://", ""));

  return esbuild.build({
    bundle: true,
    splitting: true,
    format: "esm",
    define: {
      "process.env.NODE_ENV": JSON.stringify("development"),
    },
    inject: [path.join(dirname, "../../src/react-shim.js")],
    plugins: [frontMatterPlugin],
    ...options,
  });
};

export interface BuildPageOptions {
  /** the directory with the mdx pages */
  dir: string;
  /** the directory with the mdx pages */
  outDir: string;
  /** the build is for watch mode */
  watch?: boolean;
}

export interface PageBuild {
  pages: string[];
  rebuild: () => Promise<void>;
}

export const buildPage = async (
  pages: string[],
  options: BuildPageOptions
): Promise<PageBuild> => {
  const cacheDir = findCacheDir({ name: "fwoosh" })!;
  const virtualServerPages: string[] = [];
  const virtualClientPages: string[] = [];

  await Promise.all(
    pages.map(async (page) => {
      // Path to tmp file in cached build dir
      const virtualServerPagePath = path.join(
        cacheDir,
        path.relative(options.dir, page).replace(/\.\S+$/, ".js")
      );
      virtualServerPages.push(virtualServerPagePath);
      const browserJs = path
        .relative(options.dir, page)
        .replace(/\.\S+$/, "-client.js");
      const virtualBrowserPagePath = path.join(cacheDir, browserJs);
      virtualClientPages.push(virtualBrowserPagePath);

      await fs.mkdirp(path.dirname(virtualServerPagePath));
      // Render the page
      await fs.writeFile(
        virtualServerPagePath,
        endent`
          import * as React from 'react'
          import * as Server from 'react-dom/server'
          import { Document, components } from "fwoosh"

          import Component, { frontMatter } from "${path
            .resolve(page)
            .replace("/index.tsx", "")}";
          
          console.log(Server.renderToString((
            <Document attach="${browserJs}" frontMatter={frontMatter}>
              <Component components={components} />
            </Document>
          )))
        `
      );

      await fs.writeFile(
        virtualBrowserPagePath,
        endent`
          import * as React from 'react'
          import * as ReactDOM from 'react-dom'
          import { Document, components } from "fwoosh"

          import Component, { frontMatter } from "${path
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

  const generatePage = async (page: string, file: string) => {
    // Get the output HTML of the page
    const { stdout } = await exec("node", [file]);
    const htmlPagePath = path.join(
      options.outDir,
      path.dirname(path.relative(options.dir, page)),
      `${path.parse(page).name}.html`
    );

    // Write the HTML page to the output folder
    await fs.mkdirp(path.dirname(htmlPagePath));
    await fs.writeFile(
      htmlPagePath,
      endent`
        <!DOCTYPE html />
        ${stdout}
      `
    );
  };

  const moveFilesToOut = async (outdir: string) => {
    await Promise.all(
      pages.map(async (page) => {
        const outfile = path.join(outdir, `${path.parse(page).name}.js`);
        await generatePage(page, outfile);
      })
    );

    await Promise.all(
      virtualClientPages.map(async (page) => {
        const filePath = path.join(
          path.dirname(path.relative(cacheDir, page)),
          `${path.basename(page)}`
        );
        const clientJs = path.join(outdir, filePath);

        await fs.copy(clientJs, path.join(options.outDir, filePath));
      })
    );

    const chunks = await glob(path.join(outdir, "**/chunk.*"));

    await Promise.all(
      chunks.map(async (chunk) => {
        const chunkPath = path.relative(outdir, chunk);

        await fs.copy(
          path.join(outdir, chunkPath),
          path.join(options.outDir, chunkPath)
        );
      })
    );
  };

  try {
    const outdir = path.join(cacheDir, "build");
    const mockPackage = path.join(outdir, "package.json");

    if (!fs.existsSync(mockPackage)) {
      await fs.mkdirp(path.dirname(mockPackage));
      await fs.writeFile(mockPackage, '{ "type": "module" }');
    }

    // Build the tmp build file in the cache
    const builder = await build({
      outdir,
      entryPoints: [...virtualClientPages, ...virtualServerPages],
      incremental: options.watch === true,
      loader: {
        ".js": "jsx",
      },
    });

    await moveFilesToOut(outdir);

    return {
      pages,
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
};

export const buildPages = async (options: BuildPageOptions) => {
  const pages = await glob(path.join(options.dir, "**/*.{mdx,jsx,tsx}"), {
    ignore: ["**/out/**"],
  });

  if (!pages.length) {
    console.log(
      `${bold(redBright("Uh oh!"))} No pages were found in "${options.dir}"`
    );
    return;
  }

  console.log(`${greenBright(bold("Building all pages"))}`);

  return buildPage(pages, options);
};
