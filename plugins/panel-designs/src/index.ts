import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

interface DesignsOptions {
  hideWithoutParams?: boolean;
}

export default class Designs implements Plugin {
  name = "designs";

  private options: DesignsOptions;

  constructor(options: DesignsOptions) {
    this.options = options;
  }

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerPanel.tap(this.name, (panels) => {
      return [
        ...panels,
        {
          name: "Designs",
          filepath: require.resolve("./panel"),
          hideWithoutParams: this.options.hideWithoutParams ? this.name : false,
        },
      ];
    });
  }
}

export * from "./types.js";
