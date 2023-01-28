import { Action } from "../constants";
import { packShapesIntoGroups } from "../utils";

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
    hasBeenMeasured: true,
  });

  if (shape.type === "group") {
    Object.assign(shape, {
      contentSize: [payload.width, payload.height],
    });
  }
};

export const layoutBoxes: Action = (data) => {
  Object.values(data.page.shapes).forEach((shape) => {
    shape.point = [0, 0];
    shape.size = "contentSize" in shape ? shape.contentSize : shape.size;
  });

  packShapesIntoGroups(data.meta.tree, data.page.shapes);
};
