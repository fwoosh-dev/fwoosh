import esbuild from "esbuild";
import { createProcessor } from "xdm";
import ms from "pretty-ms";
import * as path from "path";
import exec from "execa";
import fs from "fs-extra";
import findCacheDir from "find-cache-dir";
import ansi from "ansi-colors";
import glob from "fast-glob";
import { app } from "command-line-application";
import * as mdxPlugin from "./mdx-plugin.js";
import { endent } from "./utils/endent.js";
// @ts-ignore
const { redBright, bold, greenBright } = ansi;
const frontMatterPlugin = {
    name: "front-matter",
    setup(build) {
        const processor = createProcessor();
        // When a URL is loaded, we want to actually download the content
        // from the internet. This has just enough logic to be able to
        // handle the example import from unpkg.com but in reality this
        // would probably need to be more complex.
        build.onLoad({ filter: /\.mdx$/ }, async (args) => {
            return mdxPlugin.onload(processor, args);
        });
    },
};
export const build = (options) => {
    process.env.NODE_ENV = "development";
    const dirname = path.dirname(import.meta.url.replace("file://", ""));
    return esbuild.build({
        bundle: true,
        define: {
            "process.env.NODE_ENV": JSON.stringify("development"),
        },
        inject: [path.join(dirname, "../src/react-shim.js")],
        plugins: [frontMatterPlugin],
        ...options,
    });
};
export const buildWebsite = async (options) => {
    const start = process.hrtime();
    const pages = await glob(path.join(options.dir, "**/*.{mdx,jsx,tsx}"), {
        ignore: ["**/out/**"],
    });
    if (!pages.length) {
        console.log(`${bold(redBright("Uh oh!"))} No pages were found in "${options.dir}"`);
        return;
    }
    // const staticBuildPlugin = createStaticBuildPlugin(options.dir);
    const cacheDir = findCacheDir({ name: "fwoosh" });
    await Promise.all(pages.map(async (page) => {
        console.log(`${greenBright(bold("Building"))} ${path.basename(page)}`);
        // Path to tmp file in cached build dir
        const virtualPagePath = path.join(cacheDir, path.relative(options.dir, page).replace(/\.\S+$/, ".js"));
        await fs.mkdirp(path.dirname(virtualPagePath));
        // Render the page
        await fs.writeFile(virtualPagePath, endent `
          import * as React from 'react'
          import * as Server from 'react-dom/server'
          import { Document, components } from "fwoosh"

          import Component, { frontMatter } from "${path
            .resolve(page)
            .replace("/index.tsx", "")}";
          
          console.log(Server.renderToString((
            <Document frontMatter={frontMatter}>
              <Component components={components} />
            </Document>
          )))
        `);
        try {
            const outfile = path.join(cacheDir, "build", `${path.parse(page).name}.js`);
            // Build the tmp build file in the cache
            await build({
                outfile,
                entryPoints: [virtualPagePath],
                loader: {
                    ".js": "jsx",
                },
            });
            // Get the output HTML of the page
            const { stdout } = await exec("node", [outfile]);
            const htmlPagePath = path.join(options.outDir, path.dirname(path.relative(options.dir, page)), `${path.parse(page).name}.html`);
            // Write the HTML page to the output folder
            await fs.mkdirp(path.dirname(htmlPagePath));
            await fs.writeFile(htmlPagePath, endent `
            <!DOCTYPE html />
            ${stdout}
          `);
        }
        catch (error) {
            console.log(redBright("Error"), error);
            process.exit(1);
        }
    }));
    const end = process.hrtime(start);
    console.info(`\n🔥 Took ${ms(end[1] / 1000000)}`);
};
const fwoosh = {
    name: "fwoosh",
    description: "A lightening quick MDX static website generator.",
    options: [
        {
            name: "dir",
            description: "The directory that contains the mdx files for your website.",
            type: String,
            defaultOption: true,
            defaultValue: "docs",
        },
        {
            name: "out-dir",
            description: "The directory that the built website should ",
            type: String,
            defaultValue: "docs/out",
        },
    ],
};
const options = app(fwoosh);
if (options) {
    buildWebsite(options);
}
