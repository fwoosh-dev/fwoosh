import { promises as fs } from "fs";
import ansi from "ansi-colors";
import glob from "fast-glob";
import ms from "pretty-ms";
import { getCacheDir } from "./utils/get-cache-dir.js";
// @ts-ignore
const { bold, green } = ansi;
/** Display a build speed message */
const makeBuildMessage = (pagePath, time, rebuild = false) => {
    return `${rebuild ? "Rebuild" : "Built"} ${bold(`"${pagePath}"`)}, took ${green(ms(time / 1000000))}`;
};
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
    async dev(options = { port: 3000 }) {
        console.log("TODO");
    }
    getAllPages() {
        return glob(this.options.stories, {
            ignore: [`${this.options.outDir}/**`],
        });
    }
}
