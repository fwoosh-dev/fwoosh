import { TLBounds, TLShapeUtil, Utils } from "@tldraw/core";

import { GroupComponent } from "./GroupComponent.js";
import { GroupIndicator } from "./GroupIndicator.js";
import type { GroupShape } from "./GroupShape.js";

export class GroupUtil extends TLShapeUtil<GroupShape, HTMLDivElement> {
  Component = GroupComponent;

  Indicator = GroupIndicator;

  getBounds = (shape: GroupShape): TLBounds => {
    const [width, height] = shape.size;

    const bounds = {
      minX: 0,
      maxX: width,
      minY: 0,
      maxY: height,
      width,
      height,
    };

    return Utils.translateBounds(bounds, shape.point);
  };

  getShape = (props: Pick<GroupShape, "id" | "childIndex">): GroupShape => {
    return {
      ...props,
      name: props.id,
      type: "group",
      parentId: "canvas",
      rotation: 0,
      children: [],
      size: [0, 0],
      point: [0, 0],
    };
  };
}
