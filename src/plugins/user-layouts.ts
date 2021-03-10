import path from "path";
import glob from "fast-glob";

import type { Plugin, Fwoosh } from "../fwoosh.js";
import { exists } from "../utils/exists.js";

interface UserLayoutsPluginOptions {
  /** Whether to match layouts to a directory with the same name */
  matchDirectory?: boolean;
}

/**
 * Store shared layouts in the dir folder.
 */
export default class UserLayoutsPlugin implements Plugin {
  name = "user-layouts";

  private options: UserLayoutsPluginOptions;

  constructor(options: UserLayoutsPluginOptions = {}) {
    this.options = options;
  }

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.layout.register.tapPromise(this.name, async (layouts) => {
      const userLayoutsDir = path.join(fwoosh.options.dir, "layouts");

      if (await exists(userLayoutsDir)) {
        const userLayouts = await glob(
          path.join(userLayoutsDir, "**/*.{jsx,tsx}")
        );

        userLayouts.forEach((layout) => {
          layouts.push({
            path: path.resolve(layout),
            name: path.parse(layout).name,
            owner: this.name,
          });
        });
      }

      return layouts;
    });

    if (this.options.matchDirectory) {
      fwoosh.hooks.layout.match.tap(this.name, (page) => {
        const docsPath = path.relative(
          path.resolve(fwoosh.options.dir),
          page.path
        );

        if (docsPath.includes("/")) {
          const directory = path.dirname(docsPath);

          return page.layouts.find((registeredLayout) => {
            return (
              registeredLayout.owner === this.name &&
              directory === registeredLayout.name
            );
          });
        }
      });
    }
  }
}
