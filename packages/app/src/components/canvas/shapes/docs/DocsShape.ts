import type { TLShape } from "@tldraw/core";

export interface DocsShape extends TLShape {
  type: "docs";
  grouping: string[];
  size: number[];
  hasBeenMeasured: boolean;
}
