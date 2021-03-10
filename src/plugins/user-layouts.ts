import path from "path";
import glob from "fast-glob";

import type { Plugin, Fwoosh } from "../fwoosh.js";
import { exists } from "../utils/exists.js";

export default class UserLayoutsPlugin implements Plugin {
  name = "user-layouts";

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
          });
        });
      }

      return layouts;
    });
  }
}
