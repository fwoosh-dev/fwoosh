import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default class SourcePanel implements Plugin {
  name = "source-panel";

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerPanel.tap(this.name, (panels) => {
      return [
        ...panels,
        {
          name: "Source",
          paramKey: this.name,
          filepath: require.resolve("./panel"),
        },
      ];
    });
  }
}
