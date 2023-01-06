import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

interface StoryDescriptionPanelOptions {
  /** The name of the panel. */
  title: string;
}

export default class StoryDescriptionPanel implements Plugin {
  name = "source-panel";

  private options: StoryDescriptionPanelOptions;

  constructor(options: StoryDescriptionPanelOptions) {
    this.options = {
      title: options.title || "Description",
    };
  }

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerPanel.tap(this.name, (panels) => {
      return [
        ...panels,
        { name: this.options.title, filepath: require.resolve("./panel") },
      ];
    });
  }
}
