import { createState } from "@state-designer/react";
import { INITIAL_DATA } from "./constants.js";
import * as actions from "./actions";

export const machine = createState({
  data: INITIAL_DATA,
  on: {
    // MOVED_POINTER: "updatePointer",
    // SELECTED_TOOL: { to: (_, payload) => payload.name },
    // STARTED_POINTING: ["setInitialPoint", "setSnapshot"],
    PANNED: "panCamera",
    PINCHED: "pinchCamera",
    ZOOMED_IN: "zoomIn",
    ZOOMED_OUT: "zoomOut",
    ZOOMED_RESET: "zoomReset",
    CENTER_SHAPE: "centerShape",
    LAYOUT_BOXES: "layoutBoxes",
    UPDATE_DIMENSIONS: "updateDimensions",
  },
  initial: "select",
  states: {
    select: {
      initial: "idle",
      states: {
        idle: {
          // onEnter: ["clearPointedShape", "clearPerformanceMode"],
          // on: {
          //   POINTED_CANVAS: [
          //     {
          //       unless: "isPressingShiftKey",
          //       do: "deselectAllShapes",
          //     },
          //     {
          //       to: "pointing.canvas",
          //     },
          //   ],
          //   POINTED_SHAPE: [
          //     {
          //       unless: "shapeIsSelected",
          //       do: "selectShape",
          //     },
          //     { to: "pointing.shape" },
          //   ],
          //   POINTED_BOUNDS: {
          //     to: "pointing.bounds",
          //   },
          //   POINTED_HANDLE: {
          //     do: "setPointedHandle",
          //     to: "pointing.handle",
          //   },
          //   POINTED_BOUNDS_HANDLE: {
          //     do: "setPointedBoundsHandle",
          //     to: "pointing.boundsHandle",
          //   },
          // },
        },
        // pointing: {
        //   initial: "canvas",
        //   states: {
        //     canvas: {
        //       on: {
        //         STOPPED_POINTING: {
        //           to: "select.idle",
        //         },
        //         MOVED_POINTER: {
        //           to: "brushSelecting",
        //         },
        //       },
        //     },
        //     boundsHandle: {
        //       on: {
        //         MOVED_POINTER: {
        //           if: "hasLeftDeadZone",
        //           to: "transforming",
        //         },
        //         STOPPED_POINTING: {
        //           to: "select.idle",
        //         },
        //       },
        //     },
        //     bounds: {
        //       on: {
        //         MOVED_POINTER: {
        //           if: "hasLeftDeadZone",
        //           to: "translating.shapes",
        //         },
        //         STOPPED_POINTING: {
        //           do: "deselectAllShapes",
        //           to: "select.idle",
        //         },
        //       },
        //     },
        //     shape: {
        //       on: {
        //         MOVED_POINTER: {
        //           if: "hasLeftDeadZone",
        //           to: "translating.shapes",
        //         },
        //         STOPPED_POINTING: [
        //           {
        //             if: "shapeIsSelected",
        //             do: "selectShape",
        //           },
        //           {
        //             to: "select.idle",
        //           },
        //         ],
        //       },
        //     },
        //     handle: {
        //       on: {
        //         MOVED_POINTER: {
        //           if: "hasLeftDeadZone",
        //           to: "translating.handle",
        //         },
        //         STOPPED_POINTING: {
        //           do: "clearPointedHandle",
        //           to: "select.idle",
        //         },
        //       },
        //     },
        //   },
        // },
        // translating: {
        //   onEnter: ["setSnapInfo", "setTranslatePerformanceMode"],
        //   onExit: ["clearSnapInfo", "clearSnapLines", "clearIsCloning"],
        //   on: {
        //     CANCELLED: {
        //       do: "restoreSnapshot",
        //       to: "select.idle",
        //     },
        //     STOPPED_POINTING: {
        //       do: "addToHistory",
        //       to: "select.idle",
        //     },
        //   },
        //   initial: "shapes",
        //   states: {
        //     shapes: {
        //       onEnter: "removePartialBindings",
        //       on: {
        //         TOGGLED_MODIFIER: [
        //           "translateSelectedShapes",
        //           "updateBoundShapes",
        //         ],
        //         MOVED_POINTER: ["translateSelectedShapes", "updateBoundShapes"],
        //         PANNED: ["translateSelectedShapes", "updateBoundShapes"],
        //       },
        //     },
        //     handle: {
        //       on: {
        //         TOGGLED_MODIFIER: ["translateHandle", "updateBoundShapes"],
        //         MOVED_POINTER: ["translateHandle", "updateBoundShapes"],
        //         PANNED: ["translateHandle", "updateBoundShapes"],
        //       },
        //     },
        //   },
        // },
        // transforming: {
        //   onEnter: [
        //     "setSnapInfo",
        //     "setInitialCommonBounds",
        //     "setTransformPerformanceMode",
        //   ],
        //   onExit: [
        //     "clearSnapInfo",
        //     "clearSnapLines",
        //     "clearPointedBoundsHandle",
        //   ],
        //   on: {
        //     TOGGLED_MODIFIER: ["transformSelectedShapes", "updateBoundShapes"],
        //     MOVED_POINTER: ["transformSelectedShapes", "updateBoundShapes"],
        //     PANNED: ["transformSelectedShapes", "updateBoundShapes"],
        //     CANCELLED: {
        //       do: "restoreSnapshot",
        //       to: "select.idle",
        //     },
        //     STOPPED_POINTING: {
        //       do: "addToHistory",
        //       to: "select.idle",
        //     },
        //   },
        // },
        // brushSelecting: {
        //   onExit: "clearBrush",
        //   on: {
        //     TOGGLED_MODIFIER: "updateBrush",
        //     MOVED_POINTER: "updateBrush",
        //     PANNED: "updateBrush",
        //     CANCELLED: {
        //       to: "select.idle",
        //     },
        //     STOPPED_POINTING: {
        //       to: "select.idle",
        //     },
        //   },
        // },
      },
    },
  },
  // conditions: {
  //   hasLeftDeadZone(data, payload: TLPointerInfo) {
  //     return Vec.dist(mutables.currentPoint, mutables.initialPoint) > 2;
  //   },
  //   shapeIsSelected(data, payload: { target: string }) {
  //     return data.pageState.selectedIds.includes(payload.target);
  //   },
  //   shapeIsPointed(data, payload: { target: string }) {
  //     return mutables.pointedShapeId === payload.target;
  //   },
  //   isPressingShiftKey(data, payload: { shiftKey: boolean }) {
  //     return payload.shiftKey;
  //   },
  // },
  actions: actions,
});
