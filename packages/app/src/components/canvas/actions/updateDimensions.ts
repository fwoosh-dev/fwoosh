import { Action } from "../constants";
import { machine } from "../machine";
import { DOCS_GUTTER, packShapesIntoGroups, WORKBENCH_GUTTER } from "../utils";

/** Kicks off measuring each object 1 by 1 */
export const startMeasure: Action = (data) => {
  const firstShape = Object.values(data.page.shapes)[0];

  Object.assign(firstShape, {
    visibility: "measuring",
  });
};

interface UpdateDimensionsPayload {
  id: string;
  width: number;
  height: number;
}

export const updateDimensions: Action = (
  data,
  payload: UpdateDimensionsPayload
) => {
  const shape = data.page.shapes[payload.id];

  Object.assign(shape, {
    size: [payload.width, payload.height],
    visibility: "hidden",
  });

  if (shape.type === "group") {
    Object.assign(shape, {
      contentSize: [payload.width, payload.height],
    });
  }

  const keys = Object.keys(data.page.shapes);
  const index = keys.indexOf(payload.id);
  const nextShape = data.page.shapes[keys[index + 1]];

  if (nextShape) {
    Object.assign(nextShape, {
      visibility: "measuring",
    });
  } else {
    Object.values(data.page.shapes).forEach((shape) => {
      shape.point = [0, 0];
      shape.size = "contentSize" in shape ? shape.contentSize : shape.size;
    });

    packShapesIntoGroups(
      data.meta.tree,
      data.page.shapes,
      data.meta.mode === "docs" ? DOCS_GUTTER : WORKBENCH_GUTTER
    );

    Object.values(data.page.shapes).forEach((shape) => {
      Object.assign(shape, {
        visibility: "visible",
      });
    });
  }
};
