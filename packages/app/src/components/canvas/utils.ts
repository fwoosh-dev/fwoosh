import potpack from "potpack";
import { TLBounds, Utils } from "@tldraw/core";
import Vec from "@tldraw/vec";
import { StorySidebarChildItem } from "@fwoosh/types";

import { GroupShape } from "./shapes/group";
import { Shape } from "./shapes";

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
    visibility: "hidden",
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
  story: getGroupBounds,
};

export const WORKBENCH_GUTTER = 16;
export const DOCS_GUTTER = 64;

function convertShapesToPotpackData(data: Shape[], gutter: number) {
  return data.filter(Boolean).map((i) => {
    return {
      h: i.size[1] + gutter,
      w: i.size[0] + gutter,
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
  const children = [...(group.childIds || []), ...group.stories];

  children.forEach((child) => {
    const childShape = shapes[child];

    if (!childShape) {
      return;
    }

    childShape.point = Vec.add(childShape.point, moveDistance);

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
  boxes: Shape[],
  shapes: Record<string, Shape>,
  offset: number[] = [0, 0],
  gutter: number
) {
  const data = convertShapesToPotpackData(boxes, gutter);

  potpack(data);

  data.forEach((i) => {
    const shape = shapes[i.id];
    const oldPoint = shape.point;

    // Make the point below the groups content if it has it
    shape.point = Vec.add([i.x, i.y], offset);
    const moveDistance = Vec.sub(shape.point, oldPoint);

    if (shape.type === "group" && shape.stories[0] !== shape.id) {
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
  shapes: Record<string, Shape>,
  gutter = WORKBENCH_GUTTER
) {
  const boxes: Shape[] = [];

  for (const item of items) {
    const shape = shapes[item.id];

    if (!shape) {
      continue;
    }

    if (item.type === "story" && item.story.type === "basic") {
      boxes.push(shapes[item.id]);
    } else {
      const childrenBoxes =
        "children" in item ? packShapesIntoGroups(item.children, shapes) : [];
      const hasChildren =
        ("childIds" in shape && shape.childIds.length > 0) ||
        ("stories" in shape && shape.stories.length > 0);
      const data = packGroup(
        [
          ...(hasChildren ? [{ ...shape, size: shape.contentSize }] : []),
          ...childrenBoxes,
        ],
        shapes,
        [0, "contentSize" in shape ? shape.contentSize[1] + gutter : 0],
        gutter
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

  packGroup(boxes, shapes, undefined, gutter);

  return boxes;
}
