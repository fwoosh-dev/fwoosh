import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default class MeasurePlugin implements Plugin {
  name = "measure";

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerToolbarControl.tap(this.name, (controls) => {
      return [
        ...controls,
        {
          name: this.name,
          filepath: require.resolve("./toolbar"),
          scope: "story",
        },
      ];
    });
  }
}
