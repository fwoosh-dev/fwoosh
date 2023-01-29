import { createState } from "@state-designer/react";
import { INITIAL_DATA } from "./constants.js";
import * as actions from "./actions";

export const machine = createState({
  data: INITIAL_DATA,
  on: {
    PANNED: "panCamera",
    PINCHED: "pinchCamera",

    ZOOMED_IN: "zoomIn",
    ZOOMED_OUT: "zoomOut",
    ZOOMED_RESET: "zoomReset",

    CENTER_SHAPE: "centerShape",

    START_MEASURE: "startMeasure",
    UPDATE_DIMENSIONS: "updateDimensions",
  },
  initial: "select",
  states: {
    select: {
      initial: "idle",
      states: {
        idle: {},
      },
    },
  },
  actions: actions,
});
