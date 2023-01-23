import { TLShapeUtil } from "@tldraw/core";
import * as React from "react";
import type { DocsShape } from "./DocsShape.js";

export const DocsIndicator = TLShapeUtil.Indicator<DocsShape>(({ shape }) => {
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
