import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

interface StoryDescriptionPanelOptions {}

export default class StoryDescriptionPanel implements Plugin {
  name = "source-panel";

  private options: StoryDescriptionPanelOptions;

  constructor(options: StoryDescriptionPanelOptions) {
    this.options = options;
  }

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerPanel.tap(this.name, (panels) => {
      return [
        ...panels,
        { name: "Description", filepath: require.resolve("./panel") },
      ];
    });
  }
}
