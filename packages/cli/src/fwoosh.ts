import { promises as fs } from "fs";
import ansi from "ansi-colors";
import glob from "fast-glob";
import ms from "pretty-ms";

import type { FwooshHooks } from "./types";
import { getCacheDir } from "./utils/get-cache-dir.js";

interface PageBuild {
  pages: string[];
  rebuild: () => Promise<void>;
}

interface WatchPagesOptions {
  port: number;
}

// @ts-ignore
const { bold, green } = ansi;

/** Display a build speed message */
const makeBuildMessage = (pagePath: string, time: number, rebuild = false) => {
  return `${rebuild ? "Rebuild" : "Built"} ${bold(
    `"${pagePath}"`
  )}, took ${green(ms(time / 1000000))}`;
};

export interface FwooshOptions {
  /** Globs to match story files */
  stories: string[];
  /** the directory with the mdx pages */
  outDir: string;
  /** Plugins applied to this fwoosh instance, contains default plugins */
  plugins: Array<string | [name: string, options: Record<string, unknown>]>;
}

export class Fwoosh {
  /** User's fwoosh options */
  public options: Required<FwooshOptions>;

  /** Places for plugins to "tap" to add to or modify fwoosh's functionality */
  hooks: FwooshHooks = {};

  constructor(options: FwooshOptions) {
    this.options = options;
  }

  loadPlugins = async () => {
    const plugins: Plugin[] = [];

    await Promise.all(
      (this.options.plugins || []).map(async (pluginConfig) => {
        const [name, options] =
          typeof pluginConfig === "string" ? [pluginConfig, {}] : pluginConfig;

        const Plugin = await import(name);
        plugins.push(new Plugin(options));
      })
    );

    plugins.forEach((plugin) => {
      plugin.apply(this);
    });
  };

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
  async dev(options: WatchPagesOptions = { port: 3000 }) {
    console.log("TODO");
  }

  private getAllPages() {
    return glob(this.options.stories, {
      ignore: [`${this.options.outDir}/**`],
    });
  }
}

/** A fwoosh plugin */
export interface Plugin {
  /** The name of the plugin */
  name: string;
  /** Hook into fwoosh */
  apply(fwoosh: Fwoosh): void;
}
