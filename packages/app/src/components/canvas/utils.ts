import potpack from "potpack";
import { TLBounds, Utils } from "@tldraw/core";
import Vec from "@tldraw/vec";
import { StorySidebarChildItem } from "@fwoosh/types";

import { GroupShape } from "./shapes/group";
import { Shape } from "./shapes";
import { group } from "console";

export function createGroup(
  props: Pick<GroupShape, "id" | "childIndex">
): GroupShape {
  return {
    ...props,
    name: props.id,
    type: "group",
    parentId: "canvas",
    rotation: 0,
    childIds: [],
    stories: [],
    size: [0, 0],
    contentSize: [0, 0],
    hasBeenMeasured: false,
    point: [0, 0],
  };
}

export function getGroupBounds(shape: GroupShape): TLBounds {
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
}

export const getBounds = {
  group: getGroupBounds,
  docs: getGroupBounds,
};

function convertShapesToPotpackData(data: Shape[]) {
  return data.map((i) => {
    return {
      h: i.size[1] + 16,
      w: i.size[0] + 16,
      x: i.point[0],
      y: i.point[1],
      id: i.id,
    };
  });
}

/** Recursively move all the shapes in a group. */
function updateChildPositions(
  group: GroupShape,
  shapes: Record<string, Shape>,
  moveDistance: number[]
) {
  group.childIds.forEach((child) => {
    const childShape = shapes[child];

    if (!childShape) {
      return;
    }

    childShape.point = Vec.add(childShape.point, moveDistance);

    /// BUG it doesn't seem to update the nested group position
    if (childShape.type === "group") {
      updateChildPositions(childShape, shapes, moveDistance);
    }
  });
}

/**
 * Pack the groups into a square shape and update the position of the
 * children to be relative to the group.
 *
 * Optionally pass an offset to the group position to account for
 * the groups itself having a content size.
 */
function packGroup(
  boxes: GroupShape[],
  shapes: Record<string, Shape>,
  offset: number[] = [0, 0]
) {
  const data = convertShapesToPotpackData(boxes);

  potpack(data);

  data.forEach((i) => {
    const shape = shapes[i.id];
    const oldPoint = shape.point;

    // Make the point below the groups content if it has it
    shape.point = Vec.add([i.x, i.y], offset);
    const moveDistance = Vec.sub(shape.point, oldPoint);

    if (shape.type === "group") {
      updateChildPositions(shape, shapes, moveDistance);
    }
  });

  return data;
}

/**
 * Iterates over the tree and take items with type="tree" and
 * packs them into groups.
 *
 * It will then update the size of the group to fit the children
 * so that the group can be used as a container for the children.
 * This container is then used to pack those groups into bigger and
 * bigger groups.
 */
export function packShapesIntoGroups(
  items: StorySidebarChildItem[],
  shapes: Record<string, Shape>
) {
  const boxes: GroupShape[] = [];

  for (const item of items) {
    const shape = shapes[item.id];

    if (!shape || shape.type === "docs" || item.type === "story") {
      // if (item.story.type === "basic") {
      //   // boxes.push(shapes[item.id]);
      // }
      continue;
    } else {
      const childrenBoxes = packShapesIntoGroups(item.children, shapes);
      const data = packGroup(
        [
          ...(shape.childIds.length > 0
            ? [{ ...shape, size: shape.contentSize }]
            : []),
          ...childrenBoxes,
        ],
        shapes,
        [0, shape.contentSize[1] + 16]
      );

      const childBounds = data.map((i) => {
        const shape = shapes[i.id];
        return getBounds[shape.type](shape as any);
      });
      const bounds = Utils.getCommonBounds(childBounds);

      if (bounds) {
        shape.size = [bounds.width, bounds.height];
      }

      boxes.push(shape);
    }
  }

  packGroup(boxes, shapes);

  return boxes;
}
