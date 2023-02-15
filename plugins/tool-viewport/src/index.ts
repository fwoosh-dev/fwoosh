import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";
import { ViewportParameters } from "./types.js";

const require = createRequire(import.meta.url);

export default class Viewport implements Plugin {
  name = "tool-viewport";
  params = {} as ViewportParameters;

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
