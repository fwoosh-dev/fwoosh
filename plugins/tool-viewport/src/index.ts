import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";
import { ViewportParameters } from "./types.js";

const require = createRequire(import.meta.url);

interface ViewportOptions {}

export default class Viewport implements Plugin {
  name = "tool-viewport";
  params = {} as ViewportParameters;

  private options: ViewportOptions;

  constructor(options: ViewportOptions = {}) {
    this.options = options;
  }

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerToolbarControl.tap(this.name, (controls) => {
      return [
        ...controls,
        {
          name: "Viewport",
          scope: "story",
          paramKey: "viewport",
          filepath: require.resolve("./toolbar"),
        },
      ];
    });
  }
}

export * from "./types.js";
