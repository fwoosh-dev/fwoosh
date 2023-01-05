import { promises as fs } from "fs";
import ms from "pretty-ms";
import boxen from "boxen";
import path from "path";
import { createServer, InlineConfig } from "vite";
import express from "express";
import expressWs from "express-ws";
import { createRequire } from "module";
import { SyncBailHook, SyncWaterfallHook } from "tapable";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import { log, sortTree } from "@fwoosh/utils";
import bodyParser from "body-parser";
import terminalLink from "terminal-link";
import open from "better-opn";

import { endent } from "./utils/endent.js";
import type { FwooshHooks, FwooshOptions } from "./types";
import { storyListPlugin } from "./utils/story-list-plugin.js";
import { renderStoryPlugin } from "./utils/render-story-plugin.js";
import { getDocsPlugin } from "./utils/get-docs-plugin.js";
import { fwooshConfigPlugin } from "./utils/fwoosh-config-plugin.js";
import { fwooshUiPlugin } from "./utils/fwoosh-ui-plugin.js";
import { convertMarkdownToHtml } from "./utils/get-stories.js";

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
      open: false,
      modifyViteConfig: (config) => config,
      sortSidebarItems: (a, b) => {
        // Keep stories sorted by order they were defined
        if (a.type === "story" && b.type === "story") {
          return 0;
        }

        return a.name.localeCompare(b.name);
      },
      ...options,
    };
    this.hooks = {
      registerPanel: new SyncWaterfallHook(["panels"]),
      registerToolbarControl: new SyncWaterfallHook(["toolbarControls"]),
      renderStory: new SyncBailHook(),
      generateDocs: new SyncBailHook(["pathToFile"]),
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
              return `${indent}-  ${terminalLink(i, i)}`;
            })
            .join("\n")
        );
      },
    });
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
    const ws = expressWs(app);

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
          "consola",
          "lodash.chunk",
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
      define: {
        "process.env": {
          LOG_LEVEL: "process.env.LOG_LEVEL",
          FWOOSH_PORT: port,
        },
      },
    };

    const vite = await createServer({
      mode: "development",
      root: path.dirname(path.dirname(require.resolve("@fwoosh/app"))),
      ...(await this.options.modifyViteConfig(baseConfig)),
    });

    app.head("*", async (_, res) => res.sendStatus(200));

    app.get<{ file: string }>("/get-docs", async (req, res) => {
      const file = (req.query.file as string)
        .replace("http://localhost:3000/@fs", "")
        .replace("/dist/", "/src/")
        .replace(".js", ".tsx");

      const generateDocsStart = performance.now();
      const docs = this.hooks.generateDocs.call(file);
      const generateDocsEnd = performance.now();
      log.info(
        `Generate docs: ${path.relative(process.cwd(), file)} (${ms(
          generateDocsEnd - generateDocsStart
        )})`
      );

      const docsWithHtmlDescriptions = await Promise.all(
        docs.map(async (doc) => ({
          ...doc,
          description: await convertMarkdownToHtml(doc.description),
        }))
      );

      res.json(docsWithHtmlDescriptions);
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
      const html = await convertMarkdownToHtml(endent`
        \`\`\`tsx
        ${req.body}
        \`\`\`
      `);
      res.json({ html });
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

      if (this.options.open) {
        process.env.OPEN_MATCH_HOST_ONLY = "true";
        open(`http://localhost:${port}/${this.options.open}`);
      }
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
