import * as React from "react";

import { machine } from "../machine";
import { Shape } from ".";

export function useShapeMeasure(shape: Shape, id: string) {
  const measureRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!measureRef.current || shape.visibility !== "measuring") {
      return;
    }

    function updateDimensions() {
      if (!measureRef.current) return;

      const bounds = measureRef.current.getBoundingClientRect();

      if (bounds.height > 0) {
        machine.send("UPDATE_DIMENSIONS", {
          id: shape.id,
          width: bounds.width,
          height: bounds.height,
        });
      }
    }

    // I couldn't get a MutationObserver to work here, so I'm using
    // requestAnimationFrame to check if the element is still loading.
    function checkLoading() {
      return Boolean(
        (measureRef.current as HTMLElement).querySelector(
          '[data-fwoosh-fallback="true"]'
        )
      );
    }

    const isLoading = checkLoading();
    const root = document.getElementById(id);

    if (!isLoading && root && root.childNodes.length > 0) {
      updateDimensions();
      return;
    }

    function checkLoadingLoop() {
      const isLoading = checkLoading();

      if (isLoading || !root || root.childNodes.length === 0) {
        requestAnimationFrame(checkLoadingLoop);
        return true;
      }

      updateDimensions();
      cancelAnimationFrame(checkSpinner);
      return false;
    }

    const checkSpinner = requestAnimationFrame(checkLoadingLoop);

    return () => {
      cancelAnimationFrame(checkSpinner);
    };
  }, [shape.id, shape.visibility]);

  return measureRef;
}
