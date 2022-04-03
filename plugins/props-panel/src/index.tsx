import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

interface PropsPanelOptions {}

export default class PropsPanel implements Plugin {
  name = "props-panel";

  private options: PropsPanelOptions;

  constructor(options: PropsPanelOptions) {
    this.options = options;
  }

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerPanel.tap(this.name, (panels) => {
      return [
        ...panels,
        { name: "Properties", filepath: require.resolve("./panel") },
      ];
    });
  }
}
