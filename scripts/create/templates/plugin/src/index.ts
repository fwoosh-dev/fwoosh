import { Plugin, Fwoosh } from "fwoosh";

interface {{pascal}}Options {
  /** The starting zoom value on all stories */
  defaultZoomLevel?: number;
}

export default class {{pascal}} implements Plugin {
  name = "zoom";

  private options: {{pascal}}Options;

  constructor(options: {{pascal}}Options) {
    this.options = options;
  }

  apply(fwoosh: Fwoosh) {}
}
