import type { Action } from "../constants";
import potpack from "potpack";

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
  });

  const shapes = Object.values(data.page.shapes).map((i) => {
    return {
      h: i.size[1],
      w: i.size[0],
      x: i.point[0],
      y: i.point[1],
      id: i.id,
    };
  });

  potpack(shapes);

  shapes.forEach((i) => {
    data.page.shapes[i.id].point = [i.x, i.y];
  });
};
