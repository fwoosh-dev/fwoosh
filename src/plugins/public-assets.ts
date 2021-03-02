import path from "path";
import { existsSync } from "fs";
import glob from "fast-glob";

import type { Plugin, Fwoosh } from "../fwoosh";

export default class PublicAssetsPlugin implements Plugin {
  name = "public-assets";

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.addAssets.tapPromise(this.name, async (assets) => {
      const publicAssetsDir = path.join(fwoosh.options.dir, "public");

      if (existsSync(publicAssetsDir)) {
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
