import { TLBounds, TLShapeUtil, Utils } from "@tldraw/core";

import { StoryComponent } from "./StoryComponent.js";
import { StoryIndicator } from "./StoryIndicator.js";
import type { StoryShape } from "./StoryShape.js";

export class StoryUtil extends TLShapeUtil<StoryShape, HTMLDivElement> {
  Component = StoryComponent;

  Indicator = StoryIndicator;

  getBounds = (shape: StoryShape): TLBounds => {
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

  getShape = (
    props: Pick<StoryShape, "name" | "id" | "childIndex" | "grouping">
  ): StoryShape => {
    return {
      ...props,
      type: "story",
      parentId: "canvas",
      size: [0, 0],
      point: [0, 0],
      visibility: "hidden",
      rotation: 0,
    };
  };
}
