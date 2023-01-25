import type { TLShape } from "@tldraw/core";

export interface GroupShape extends TLShape {
  type: "group";
  children: string[];
  size: number[];
}
