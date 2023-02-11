import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

interface StoryDescriptionPanelOptions {
  /** The name of the panel. */
  title: string;
}

export default class StoryDescriptionPanel implements Plugin {
  name = "story-description-panel";

  private options: StoryDescriptionPanelOptions;

  constructor(
    { title }: StoryDescriptionPanelOptions = { title: "Description" }
  ) {
    this.options = {
      title,
    };
  }

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerPanel.tap(this.name, (panels) => {
      return [
        ...panels,
        {
          name: this.options.title,
          paramKey: this.name,
          hideInDocs: true,
          filepath: require.resolve("./panel"),
        },
      ];
    });
  }
}
