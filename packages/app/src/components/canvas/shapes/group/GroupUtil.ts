import { TLShapeUtil } from "@tldraw/core";
import { getGroupBounds } from "../../utils.js";

import { GroupComponent } from "./GroupComponent.js";
import { GroupIndicator } from "./GroupIndicator.js";
import type { GroupShape } from "./GroupShape.js";

export class GroupUtil extends TLShapeUtil<GroupShape, HTMLDivElement> {
  Component = GroupComponent;
  Indicator = GroupIndicator;
  getBounds = getGroupBounds;
}
