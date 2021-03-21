import path from "path";
import glob from "fast-glob";

import type { Plugin, Fwoosh } from "../fwoosh.js";
import { exists } from "../utils/exists.js";
import { endent } from "../utils/endent.js";

const getPublicAssets = async (dir: string) => {
  const publicAssetsDir = path.join(dir, "public");

  if (await exists(publicAssetsDir)) {
    const assets = await glob(path.join(publicAssetsDir, "**/*"));

    return assets.map((asset) => ({
      path: asset,
      folder: publicAssetsDir,
    }));
  }
};

export default class PublicAssetsPlugin implements Plugin {
  name = "public-assets";

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.addAssets.tapPromise(this.name, async (assets) => {
      const publicAssets = await getPublicAssets(fwoosh.options.dir);

      if (publicAssets) {
        return [...assets, ...publicAssets];
      }

      return assets;
    });

    fwoosh.hooks.processPage.tapPromise(this.name, async (page) => {
      const assets = (await getPublicAssets(fwoosh.options.dir)) || [];
      const favicon = assets
        .map((asset) => path.relative(asset.folder, asset.path))
        .find((asset) => asset.includes("favicon."));
      const faviconDark = assets
        .map((asset) => path.relative(asset.folder, asset.path))
        .find((asset) => asset.includes("favicon-dark."));

      return endent`
        ${
          favicon
            ? `<link rel="icon" href="${favicon}" type="image/x-icon"/ >`
            : ""
        }
        ${
          faviconDark
            ? `<link rel="icon" href="${faviconDark}" type="image/x-icon" media="(prefers-color-scheme:dark)" />`
            : ""
        }
        ${page}
      `;
    });
  }
}
