import { Action, packTree } from "../constants";

interface UpdateDimensionsPayload {
  id: string;
  width: number;
  height: number;
}

export const updateDimensions: Action = (
  data,
  payload: UpdateDimensionsPayload
) => {
  Object.assign(data.page.shapes[payload.id], {
    size: [payload.width, payload.height],
    hasBeenMeasured: true,
  });
};

export const layoutBoxes: Action = (data) => {
  Object.values(data.page.shapes).forEach((shape) => {
    shape.point = [0, 0];
  });

  packTree(data.tree, data.page.shapes);
};
