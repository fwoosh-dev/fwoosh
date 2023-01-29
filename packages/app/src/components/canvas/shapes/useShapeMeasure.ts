import * as React from "react";

import { machine } from "../machine";
import { Shape } from ".";

export function useShapeMeasure(shape: Shape, canMeasure = true) {
  const measureRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (measureRef.current && canMeasure && shape.visibility === "measuring") {
      const bounds = measureRef.current?.getBoundingClientRect();

      if (bounds.height > 0) {
        machine.send("UPDATE_DIMENSIONS", {
          id: shape.id,
          width: bounds.width,
          height: bounds.height,
        });
      }
    }
  }, [canMeasure, shape.id, shape.visibility]);

  return measureRef;
}
