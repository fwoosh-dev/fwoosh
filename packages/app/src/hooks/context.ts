import * as React from "react";
import { Shape } from "../components/canvas/shapes";

export const WorkbenchCanvasShapesContext = React.createContext<
  Record<string, Shape> | undefined
>(
  typeof window !== "undefined"
    ? window.FWOOSH_WORKBENCH_CANVAS_SHAPES
    : undefined
);
