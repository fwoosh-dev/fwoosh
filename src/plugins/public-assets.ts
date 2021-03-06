import path from "path";
import glob from "fast-glob";

import type { Plugin, Fwoosh } from "../fwoosh.js";
import { exists } from "../utils/exists.js";

export default class PublicAssetsPlugin implements Plugin {
  name = "public-assets";

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.addAssets.tapPromise(this.name, async (assets) => {
      const publicAssetsDir = path.join(fwoosh.options.dir, "public");

      if (await exists(publicAssetsDir)) {
        const publicAssets = await glob(path.join(publicAssetsDir, "**/*"));

        publicAssets.forEach((asset) => {
          assets.push({
            path: asset,
            folder: publicAssetsDir,
          });
        });
      }

      return assets;
    });
  }
}
