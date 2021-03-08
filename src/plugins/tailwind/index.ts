import * as path from "path";
import { apply, setup, ThemeConfiguration } from "twind";
import { asyncVirtualSheet } from "twind/server";
import { getStyleTag } from "twind/sheets";
import { shim } from "twind/shim/server";
import { css } from "twind/css";

import type { Plugin, Fwoosh } from "../../fwoosh.js";
import { endent } from "../../utils/endent.js";

interface TailwindPluginOptions {
  /** Theme to apply to tailwindcss */
  theme?: ThemeConfiguration;
}

const sheet = asyncVirtualSheet();

export default class TailwindPlugin implements Plugin {
  name = "tailwind";

  private options: TailwindPluginOptions;

  constructor(options: TailwindPluginOptions = {}) {
    this.options = options;

    setup({
      sheet,
      mode: "silent",
      theme: this.options.theme,
      preflight: (preflight) =>
        css(preflight, {
          html: apply`dark:bg-gray-900`,
        }),
    });
  }

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerComponents.tap(this.name, (components) => {
      const tailwindComponents = path
        .join(path.dirname(import.meta.url), "components.js")
        .replace("file:", "");

      return [...components, tailwindComponents];
    });

    // Shimming isn't really necessary but it gives us a few things:
    // 
    // 1. Easier tailwind usage in MDX files
    // 2. Attaches html dark background
    // 3. Better SSR experience
    fwoosh.hooks.processPage.tapPromise(this.name, async (page) => {
      sheet.reset();

      const markup = shim(page);
      const styleTag = getStyleTag(sheet);

      return endent`
        ${styleTag}
        ${markup}
      `;
    });
  }
}
