import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default class Designs implements Plugin {
  name = "designs";

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerPanel.tap(this.name, (panels) => {
      return [
        ...panels,
        { name: "Designs", filepath: require.resolve("./panel") },
      ];
    });
  }
}

export * from "./types.js";
