import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

interface SourcePanelOptions {}

export default class SourcePanel implements Plugin {
  name = "source-panel";

  private options: SourcePanelOptions;

  constructor(options: SourcePanelOptions) {
    this.options = options;
  }

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
