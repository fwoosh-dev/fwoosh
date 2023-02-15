import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default class ActionsPanel implements Plugin {
  name = "actions-panel";

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerPanel.tap(this.name, (panels) => {
      return [
        ...panels,
        {
          name: "Actions",
          paramKey: this.name,
          filepath: require.resolve("./panel"),
        },
      ];
    });
  }
}
