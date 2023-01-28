import { TLBounds, TLShapeUtil, Utils } from "@tldraw/core";

import { DocsComponent } from "./DocsComponent.js";
import { DocsIndicator } from "./DocsIndicator.js";
import type { DocsShape } from "./DocsShape.js";

export class DocsUtil extends TLShapeUtil<DocsShape, HTMLDivElement> {
  Component = DocsComponent;

  Indicator = DocsIndicator;

  getBounds = (shape: DocsShape): TLBounds => {
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
    props: Pick<DocsShape, "name" | "id" | "childIndex" | "grouping">
  ): DocsShape => {
    return {
      ...props,
      type: "docs",
      parentId: "canvas",
      size: [0, 0],
      point: [0, 0],
      hasBeenMeasured: false,
      rotation: 0,
    };
  };
}
