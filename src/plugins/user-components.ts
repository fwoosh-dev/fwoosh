import path from "path";
import glob from "fast-glob";

import type { Plugin, Fwoosh } from "../fwoosh.js";
import { exists } from "../utils/exists.js";

export default class UserComponentsPlugin implements Plugin {
  name = "user-components";

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerComponents.tapPromise(
      this.name,
      async (components) => {
        const userComponentsDir = path.join(fwoosh.options.dir, "components");

        if (await exists(userComponentsDir)) {
          const [userComponents] = await glob(
            path.join(userComponentsDir, "**/{components,index}.{jsx,tsx}")
          );

          if (userComponents) {
            components.push(userComponents);
          }
        }

        return components;
      }
    );
  }
}
