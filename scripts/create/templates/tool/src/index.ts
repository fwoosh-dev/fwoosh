import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

interface {{pascal}}Options {
}

export default class {{pascal}} implements Plugin {
  name = "{{kebab}}";

  private options: {{pascal}}Options;

  constructor(options: {{pascal}}Options) {
    this.options = options;
  }

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerToolbarControl.tap(this.name, (controls) => {
      return [...controls, require.resolve("./toolbar")];
    });
  }
}
