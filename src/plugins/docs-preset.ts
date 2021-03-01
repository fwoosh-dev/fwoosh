import type { Plugin, Fwoosh } from "../fwoosh";

export default class DocsPreset implements Plugin {
  name = "docs-preset";

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerLayouts.tap(this.name, (layouts) => {
      return layouts;
    });
  }
}
