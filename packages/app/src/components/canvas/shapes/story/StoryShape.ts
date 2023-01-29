import type { TLShape } from "@tldraw/core";

export interface StoryShape extends TLShape {
  type: "story";
  grouping: string[];
  size: number[];
  visibility: "hidden" | "measuring" | "visible";
}
