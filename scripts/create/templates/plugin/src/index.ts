import { Plugin, Fwoosh } from "fwoosh";

interface {{pascal}}Options {
}

export default class {{pascal}} implements Plugin {
  name = "{{kebab}}";

  private options: {{pascal}}Options;

  constructor(options: {{pascal}}Options) {
    this.options = options;
  }

  apply(fwoosh: Fwoosh) {}
}
