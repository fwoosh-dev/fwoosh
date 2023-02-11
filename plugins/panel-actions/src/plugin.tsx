import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

interface ActionsPanelOptions {}

export default class ActionsPanel implements Plugin {
  name = "actions-panel";

  private options: ActionsPanelOptions;

  constructor(options: ActionsPanelOptions = {}) {
    this.options = options;
  }

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
