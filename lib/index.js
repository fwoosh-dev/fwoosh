import esbuild from "esbuild";
import xdm from "xdm/esbuild.js";
import * as path from "path";
import exec from "execa";
import fs from "fs-extra";
import findCacheDir from "find-cache-dir";
import ansi from "ansi-colors";
import glob from "fast-glob";
import { app } from "command-line-application";
import endentPackage from "endent";
const endent = endentPackage.default;
// @ts-ignore
const { redBright, bold, greenBright } = ansi;
export const build = (options) => {
    process.env.NODE_ENV = "development";
    const dirname = path.dirname(import.meta.url.replace("file://", ""));
    return esbuild.build({
        bundle: true,
        define: {
            "process.env.NODE_ENV": JSON.stringify("development"),
        },
        inject: [path.join(dirname, "../src/react-shim.js")],
        plugins: [
            xdm({
            /* Options… */
            }),
        ],
        ...options,
    });
};
export const buildWebsite = async (options) => {
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
        const virtualPagePath = path.join(cacheDir, path.relative(options.dir, page).replace(/\.\S+$/, ".js"));
        await fs.mkdirp(path.dirname(virtualPagePath));
        await fs.writeFile(virtualPagePath, endent `
          import * as React from 'react'
          import * as Server from 'react-dom/server'
          import { Document } from "fwoosh/document"

          import Component from "${path
            .resolve(page)
            .replace("/index.tsx", "")}";
          
          console.log(Server.renderToString((
            <Document>
              <Component />
            </Document>
          )))
        `);
        try {
            const outfile = path.join(cacheDir, "build", `${path.parse(page).name}.js`);
            await build({
                outfile,
                entryPoints: [virtualPagePath],
                loader: {
                    ".js": "jsx",
                },
            });
            const { stdout } = await exec("node", [outfile]);
            await fs.writeFile(path.join(options.outDir, path.dirname(path.relative(options.dir, page)), `${path.parse(page).name}.html`), endent `
            <!DOCTYPE html />
            ${stdout}
          `);
        }
        catch (error) {
            console.log(redBright("Error"), error);
        }
    }));
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
