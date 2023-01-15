import { promises as fs } from "fs";
import ms from "pretty-ms";
import boxen from "boxen";
import path from "path";
import { createServer, InlineConfig, build } from "vite";
import express from "express";
import expressWs from "express-ws";
import { createRequire } from "module";
import {
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
  SyncWaterfallHook,
} from "tapable";
import mdx from "@mdx-js/rollup";
import { log, sortTree } from "@fwoosh/utils";
import bodyParser from "body-parser";
import terminalLink from "terminal-link";
import open from "better-opn";
import { h } from "hastscript";
import { Element } from "hast";

import { Pluggable } from "unified";
import remarkFrontmatter from "remark-frontmatter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkSlug from "remark-slug";
import toc from "@jsdevtools/rehype-toc";
import rehypeInferTitleMeta from "rehype-infer-title-meta";

import { endent } from "./utils/endent.js";
import type {
  FwooshClass,
  FwooshHooks,
  FwooshOptionsLoaded,
  FwooshOptionWithCLIDefaults,
  Plugin,
} from "@fwoosh/types";
import { storyListPlugin } from "./utils/story-list-plugin/index.js";
import { renderStoryPlugin } from "./utils/render-story-plugin.js";
import { getDocsPlugin } from "./utils/get-docs-plugin/index.js";
import { fwooshSetupPlugin } from "./utils/fwoosh-setup-plugin.js";
import { fwooshConfigPlugin } from "./utils/fwoosh-config-plugin.js";
import { fwooshUiPlugin } from "./utils/fwoosh-ui-plugin.js";
import { convertMarkdownToHtml } from "./utils/get-stories.js";
import { shikiConfig } from "./utils/shiki-config.js";
import { componentOverridePlugin } from "./utils/component-override-plugins.js";

const require = createRequire(import.meta.url);

interface WatchPagesOptions {
  port: number;
}

interface BuildOptions {
  outDir: string;
}

export class Fwoosh implements FwooshClass {
  /** User's fwoosh options */
  public options: FwooshOptionsLoaded;

  /** Places for plugins to "tap" to add to or modify fwoosh's functionality */
  public hooks: FwooshHooks;

  constructor({ theme, ...options }: FwooshOptionWithCLIDefaults) {
    this.options = {
      docgen: {},
      componentOverrides: undefined,
      title: "Fwoosh",
      setup: "",
      open: false,
      basename: "/",
      modifyViteConfig: (config) => config,
      sortSidebarItems: (a, b) => {
        // Keep stories sorted by order they were defined
        if (a.type === "story" && b.type === "story") {
          return 0;
        }

        // Render stories/mdx before trees
        if (a.type === "tree" && b.type === "story") {
          return 1;
        }

        if (b.type === "tree" && a.type === "story") {
          return -1;
        }

        // Default to sorting by name
        return a.name.localeCompare(b.name);
      },
      ...options,
    };

    if (theme) {
      if (typeof theme === "object") {
        this.options.theme = theme;
      } else {
        this.options.theme = require(theme);
      }
    }

    log.info("Loaded options:", this.options);

    this.hooks = {
      registerPanel: new SyncWaterfallHook(["panels"]),
      registerToolbarControl: new SyncWaterfallHook(["toolbarControls"]),
      renderStory: new AsyncSeriesBailHook(),
      generateDocs: new AsyncSeriesBailHook(["pathToFile"]),
      modifyViteConfig: new AsyncSeriesWaterfallHook(["config"]),
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

  async loadPlugins() {
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
  }

  async getViteConfig({
    port = 3000,
    outDir,
    mode,
  }: Partial<WatchPagesOptions> &
    Partial<BuildOptions> & { mode: "development" | "production" }) {
    const toolbarControls = this.hooks.registerToolbarControl.call([]);
    const panels = this.hooks.registerPanel.call([]);
    const includedHeadings = ["h2", "h3", "h4", "h5", "h6"];
    const depsToOptimize = [
      "react-helmet-async",
      "command-score",
      "mousetrap",
      "react",
      "react-dom",
      "react-dom/client",
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
    ];

    process.env.NODE_ENV = mode;

    const baseConfig: InlineConfig = {
      mode,
      root: path.dirname(path.dirname(require.resolve("@fwoosh/app"))),
      base: this.options.basename,
      plugins: [
        mdx({
          remarkPlugins: [remarkFrontmatter, remarkSlug],
          rehypePlugins: [
            rehypeInferTitleMeta,
            // Inline data from above plugins into the page
            () => {
              return (tree, file) => {
                tree.children.push(
                  h(
                    "script",
                    {
                      id: "html-metadata",
                      type: "application/json",
                    },
                    JSON.stringify(file.data)
                  )
                );
              };
            },
            [
              rehypeAutolinkHeadings,
              {
                behavior: "before",
                test: includedHeadings,
                group(el: any) {
                  return h("div", {
                    "data-link-group": true,
                    style: { position: "relative" },
                    "data-level": parseInt(el.tagName.replace("h", "")),
                    "data-level-id": el.properties.id,
                  });
                },
                properties: {
                  "data-link-icon": true,
                },
                content: (node: Element) =>
                  h(
                    "span.visually-hidden",
                    "Link to the '",
                    String(node),
                    "' section"
                  ),
              },
            ],
            shikiConfig as Pluggable,
            [
              toc,
              {
                headings: includedHeadings,
              },
            ],
          ],
          providerImportSource: "@mdx-js/react",
        }),
        fwooshSetupPlugin({ file: this.options.setup }),
        fwooshUiPlugin({ toolbarControls, panels }),
        fwooshConfigPlugin(this.options),
        getDocsPlugin({
          port,
          generateDocs: (file) => this.hooks.generateDocs.promise(file),
          ...this.options.docgen,
        }),
        storyListPlugin(this.options),
        renderStoryPlugin(await this.hooks.renderStory.promise()),
        componentOverridePlugin(this.options),
        {
          name: "fwoosh:404",
          enforce: "post",
          writeBundle: async () => {
            if (!outDir) {
              return;
            }

            const pathOf404 = path.join(outDir, "404.html");
            const contentsOf404 = await fs.readFile(pathOf404, "utf8");

            await fs.writeFile(
              pathOf404,
              contentsOf404.replace(
                "process.env.FWOOSH_PATH_SEGMENTS_TO_KEEP",
                String(this.options.basename.split("/").filter(Boolean).length)
              )
            );
          },
        },
      ],
      optimizeDeps: {
        entries: [require.resolve("@fwoosh/app/index.html")],
        exclude: ["@fwoosh/*"],
        include: depsToOptimize,
      },
      build: {
        outDir,
        emptyOutDir: true,
      },
      server: {
        port,
        middlewareMode: true,
        fs: {
          strict: false,
        },
      },
      define: {
        "process.env.LOG_LEVEL": `"${process.env.LOG_LEVEL}"`,
        "process.env.FWOOSH_BASE_NAME": `"${this.options.basename}"`,
      },
    };

    const configWithPluginModifications = await this.hooks.modifyViteConfig.promise(
      baseConfig
    );

    return this.options.modifyViteConfig(configWithPluginModifications);
  }

  /** Clean up all the output files */
  async clean() {
    await Promise.all([
      fs.rm(this.options.outDir, { recursive: true, force: true }),
    ]);
  }

  /** Do a production build of the website */
  async build({ outDir }: BuildOptions) {
    const config = await this.getViteConfig({ outDir, mode: "production" });
    const output = await build(config);
  }

  /** Start the development server */
  async dev({ port }: WatchPagesOptions = { port: 3000 }) {
    const app = express();
    const ws = expressWs(app);
    const viteConfig = await this.getViteConfig({
      mode: "development",
      port,
    });
    const vite = await createServer({
      ...viteConfig,
      assetsInclude: ["**/*.html"],
    });

    log.trace("Loaded vite with config:", vite.config);

    app.head("*", async (_, res) => res.sendStatus(200));

    ws.app.ws("/get-docs", async (ws) => {
      ws.on("message", async (message: string) => {
        const file = message
          .replace("http://localhost:3000/@fs", "")
          .replace("/dist/", "/src/")
          .replace(".js", ".tsx");

        const generateDocsStart = performance.now();
        const docs = await this.hooks.generateDocs.promise(file);
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

        ws.send(JSON.stringify(docsWithHtmlDescriptions));
      });
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
