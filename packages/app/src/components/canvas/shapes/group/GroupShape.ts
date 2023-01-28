import type { TLShape } from "@tldraw/core";

export interface GroupShape extends TLShape {
  type: "group";
  childIds: string[];
  stories: string[];
  contentSize: number[];
  size: number[];
}
