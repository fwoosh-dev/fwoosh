import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

interface MeasurePluginOptions {}

export default class MeasurePlugin implements Plugin {
  name = "measure";

  private options: MeasurePluginOptions;

  constructor(options: MeasurePluginOptions) {
    this.options = options;
  }

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerToolbarControl.tap(this.name, (controls) => {
      return [...controls, require.resolve("./toolbar")];
    });
  }
}
