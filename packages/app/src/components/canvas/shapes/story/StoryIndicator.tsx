import { TLShapeUtil } from "@tldraw/core";
import * as React from "react";
import type { StoryShape } from "./StoryShape.js";

export const StoryIndicator = TLShapeUtil.Indicator<StoryShape>(({ shape }) => {
  return (
    <rect
      fill="none"
      stroke="dodgerblue"
      strokeWidth={1}
      width={shape.size[0]}
      height={shape.size[1]}
    />
  );
});
