import { TLShapeUtil } from "@tldraw/core";
import * as React from "react";
import type { GroupShape } from "./GroupShape.js";

export const GroupIndicator = TLShapeUtil.Indicator<GroupShape>(() => {
  return <rect fill="none" stroke="dodgerblue" strokeWidth={1} />;
});
