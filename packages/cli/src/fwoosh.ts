import { promises as fs } from "fs";
import boxen from "boxen";
import path from "path";
import { createServer, InlineConfig } from "vite";
import express from "express";
import { createRequire } from "module";
import { SyncBailHook, SyncWaterfallHook } from "tapable";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";

import type { FwooshHooks, FwooshOptions } from "./types";
import { storyListPlugin } from "./utils/story-list-plugin.js";
import { renderStoryPlugin } from "./utils/render-story-plugin.js";
import { getDocsPlugin } from "./utils/get-docs-plugin.js";
import { fwooshConfigPlugin } from "./utils/fwoosh-config-plugin.js";
import { fwooshUiPlugin } from "./utils/fwoosh-ui-plugin.js";

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
    this.options = {
      config: (config) => config,
      ...options,
    };
    this.hooks = {
      registerPanel: new SyncWaterfallHook(["panels"]),
      registerToolbarControl: new SyncWaterfallHook(["toolbarControls"]),
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
  };

  /** Clean up all the output files */
  async clean() {
    await Promise.all([
      fs.rm(this.options.outDir, { recursive: true, force: true }),
    ]);
  }

  /** Do a production build of the website */
  async build() {
    console.log("TODO");
  }

  /** Start the development server */
  async dev({ port }: WatchPagesOptions = { port: 3000 }) {
    const app = express();
    const toolbarControls = this.hooks.registerToolbarControl.call([]);
    const panels = this.hooks.registerPanel.call([]);
    const baseConfig: InlineConfig = {
      plugins: [
        mdx({
          remarkPlugins: [remarkFrontmatter],
          providerImportSource: "@mdx-js/react",
        }),
        fwooshUiPlugin({ toolbarControls, panels }),
        fwooshConfigPlugin(this.options),
        getDocsPlugin(),
        storyListPlugin(this.options),
        renderStoryPlugin(this.hooks.renderStory.call()),
      ],
      optimizeDeps: {
        include: [
          "react",
          "react-dom",
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
        ],
      },
      server: {
        port,
        middlewareMode: true,
        fs: {
          strict: false,
        },
      },
      assetsInclude: ["**/*.html"],
    };

    const vite = await createServer({
      mode: "development",
      root: path.dirname(path.dirname(require.resolve("@fwoosh/app"))),
      ...(await this.options.config(baseConfig)),
    });

    app.head("*", async (_, res) => res.sendStatus(200));

    app.get<{ file: string }>("/get-docs", async (req, res) => {
      const file = (req.query.file as string)
        .replace("http://localhost:3000/@fs", "")
        .replace("/dist/", "/src/")
        .replace(".js", ".tsx");
      const docs = this.hooks.generateDocs.call(file);

      res.json(docs);
    });

    app.use(vite.middlewares);

    app.listen(port, async () => {
      console.log(
        boxen(`fwoosh served at http://localhost:${port}/storybook`, {
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
