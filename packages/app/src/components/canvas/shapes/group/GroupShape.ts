import type { TLShape } from "@tldraw/core";

export interface GroupShape extends TLShape {
  type: "group";
  children: string[];
  stories: string[];
  contentSize: number[];
  size: number[];
  hasBeenMeasured: boolean;
}
