import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";
import { DesignsPanelParametersObject } from "./types.js";

const require = createRequire(import.meta.url);

interface DesignsOptions {
  hideWithoutParams?: boolean;
}

export default class Designs implements Plugin {
  name = "designs" as const;
  params = {} as DesignsPanelParametersObject;

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
          paramKey: this.name,
          filepath: require.resolve("./panel"),
          hideWithoutParams: this.options.hideWithoutParams,
        },
      ];
    });
  }
}
