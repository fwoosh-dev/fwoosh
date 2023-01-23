import type { TLShape } from "@tldraw/core";

export interface DocsShape extends TLShape {
  type: "docs";
  size: number[];
}
