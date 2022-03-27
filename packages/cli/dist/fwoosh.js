import { promises as fs } from "fs";
import boxen from "boxen";
import path from "path";
import { createServer } from "vite";
import express from "express";
import { createRequire } from "module";
import { getCacheDir } from "./utils/get-cache-dir.js";
import { fwooshPlugin } from "./utils/vite-plugin.js";
import { getStories } from "./utils/get-stories.js";
const require = createRequire(import.meta.url);
export class Fwoosh {
    constructor(options) {
        /** Places for plugins to "tap" to add to or modify fwoosh's functionality */
        this.hooks = {};
        this.loadPlugins = async () => {
            const plugins = [];
            await Promise.all((this.options.plugins || []).map(async (pluginConfig) => {
                const [name, options] = typeof pluginConfig === "string" ? [pluginConfig, {}] : pluginConfig;
                const Plugin = await import(name);
                plugins.push(new Plugin(options));
            }));
            plugins.forEach((plugin) => {
                plugin.apply(this);
            });
        };
        this.options = options;
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
        console.log("TODO");
    }
    /** Start the development server */
    async dev({ port } = { port: 3000 }) {
        const stories = await getStories(this.options);
        const app = express();
        const vite = await createServer({
            mode: "development",
            root: path.dirname(path.dirname(require.resolve("@fwoosh/app"))),
            plugins: [fwooshPlugin(this.options)],
            server: {
                port,
                middlewareMode: "html",
                fs: {
                    strict: false,
                },
            },
        });
        app.head("*", async (_, res) => res.sendStatus(200));
        app.get("/meta.json", async (_, res) => {
            res.json(stories);
        });
        app.use(vite.middlewares);
        app.listen(port, async () => {
            console.log(boxen(`fwoosh served at http://localhost:${port}`, {
                padding: 1,
                margin: 1,
                borderStyle: "round",
                borderColor: "green",
                titleAlignment: "center",
                textAlignment: "center",
            }));
            // await open(`http://localhost:${port}`);
        });
    }
}
