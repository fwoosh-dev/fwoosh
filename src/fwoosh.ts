import { AsyncSeriesWaterfallHook } from "tapable";
import fs from "fs-extra";

import { getCacheDir } from "./utils/get-cache-dir.js";
import {
  PageBuilder,
  PageBuilderOptions,
  Layout,
} from "./utils/page-builder.js";
import UserLayoutsPlugin from "./plugins/user-layouts.js";

interface PluginHooks {
  registerLayouts: AsyncSeriesWaterfallHook<[Layout[]]>;
}

export type FwooshOptions = Pick<PageBuilderOptions, "dir" | "outDir">;

export class Fwoosh {
  public options: Required<FwooshOptions>;
  private layouts?: Layout[];
  private plugins: Plugin[];

  hooks: PluginHooks = {
    registerLayouts: new AsyncSeriesWaterfallHook(["layouts"]),
  };

  constructor(options: FwooshOptions) {
    this.options = options;
    this.plugins = [new UserLayoutsPlugin()];

    this.plugins.forEach((plugin) => {
      plugin.apply(this);
    });
  }

  private async getLayouts() {
    if (this.layouts) {
      return this.layouts;
    }

    const layouts = await this.hooks.registerLayouts.promise([]);
    this.layouts = layouts;
    return layouts;
  }

  async getLayout(name: string) {
    const layouts = await this.getLayouts();
    const layout = layouts.find((layout) => layout.name === name);

    if (!layout) {
      throw new Error(
        `You specified a layout in a that isn't registered! ${layout}`
      );
    }
  }

  clean() {
    fs.rmSync(this.options.outDir, { recursive: true, force: true });
    fs.rmSync(getCacheDir(), { recursive: true, force: true });
  }

  async build() {
    const pageBuilder = new PageBuilder(this.options, await this.getLayouts());
    await pageBuilder.buildPages();
  }

  async dev() {
    const pageBuilder = new PageBuilder(this.options, await this.getLayouts());
    await pageBuilder.watchPages();
  }
}

export interface Plugin {
  name: string;
  apply(fwoosh: Fwoosh): void;
}
