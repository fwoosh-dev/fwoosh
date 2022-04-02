import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

interface ZoomPluginOptions {
  /** The starting zoom value on all stories */
  defaultZoomLevel?: number;
}

export default class ZoomPlugin implements Plugin {
  name = "zoom";

  private options: ZoomPluginOptions;

  constructor(options: ZoomPluginOptions) {
    this.options = options;
  }

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerToolbarControl.tap(this.name, (controls) => {
      return [...controls, require.resolve("./toolbar")];
    });
  }
}
