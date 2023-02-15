import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default class PropsPanel implements Plugin {
  name = "props-panel";

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerPanel.tap(this.name, (panels) => {
      return [
        ...panels,
        {
          name: "Properties",
          paramKey: this.name,
          filepath: require.resolve("./panel"),
        },
      ];
    });
  }
}
