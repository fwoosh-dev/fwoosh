import { promises as fs } from "fs";
import boxen from "boxen";
import path from "path";
import open from "open";
import { createServer } from "vite";
import express from "express";
import { createRequire } from "module";
import { SyncBailHook } from "tapable";
import Unocss from "unocss/vite";
import presetWind from "@unocss/preset-wind";

import type { FwooshHooks, FwooshOptions } from "./types";
import { getCacheDir } from "./utils/get-cache-dir.js";
import { storyListPlugin } from "./utils/story-list-plugin.js";
import { getStories } from "./utils/get-stories.js";
import { renderStoryPlugin } from "./utils/render-story-plugin.js";
import { getDocsPlugin } from "./utils/get-docs-plugin.js";

const require = createRequire(import.meta.url);

interface WatchPagesOptions {
  port: number;
}

export class Fwoosh {
  /** User's fwoosh options */
  public options: Required<FwooshOptions>;

  /** Places for plugins to "tap" to add to or modify fwoosh's functionality */
  public hooks: FwooshHooks;

  constructor(options: FwooshOptions) {
    this.options = options;
    this.hooks = {
      renderStory: new SyncBailHook(),
      generateDocs: new SyncBailHook(["pathToFile"]),
    };
  }

  loadPlugins = async () => {
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

          const Plugin = (await import(name)).default;
          plugins.push(new Plugin(options));
        }
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
  async dev({ port }: WatchPagesOptions = { port: 3000 }) {
    const app = express();
    const vite = await createServer({
      mode: "development",
      root: path.dirname(path.dirname(require.resolve("@fwoosh/app"))),
      plugins: [
        getDocsPlugin(),
        storyListPlugin(this.options),
        renderStoryPlugin(this.hooks.renderStory.call()),
        Unocss({ presets: [presetWind()], include: [/\.js$/] }),
      ],
      server: {
        port,
        middlewareMode: "html",
        fs: {
          strict: false,
        },
      },
    });

    app.head("*", async (_, res) => res.sendStatus(200));

    app.get<{ title: string }>("/get-docs", async (req, res) => {
      const stories = await getStories(this.options);
      const activeStory = stories.find((s) => s.meta.title === req.query.title);

      if (!activeStory) {
        return res.sendStatus(404);
      }

      const storyModule = vite.moduleGraph.fileToModulesMap.get(
        activeStory.meta.file
      );

      if (!storyModule) {
        return res.sendStatus(404);
      }

      res.json(this.hooks.generateDocs.call(activeStory.meta.component));
    });

    app.use(vite.middlewares);

    app.listen(port, async () => {
      console.log(
        boxen(`fwoosh served at http://localhost:${port}`, {
          padding: 1,
          margin: 1,
          borderStyle: "round",
          borderColor: "green",
          titleAlignment: "center",
          textAlignment: "center",
        })
      );

      // await open(`http://localhost:${port}`);
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
