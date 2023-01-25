import { createContext } from "react";
import { tree } from "@fwoosh/app/stories";
import type { S } from "@state-designer/react";
import potpack from "potpack";
import type {
  TLBinding,
  TLPage,
  TLPageState,
  TLPerformanceMode,
  TLSnapLine,
} from "@tldraw/core";
import { StorySidebarChildItem } from "@fwoosh/types";
import Vec from "@tldraw/vec";

import { Shape, shapeUtils } from "./shapes";
import { GroupShape } from "./shapes/group";

export const VERSION = 1;
export const PERSIST_DATA = true;
export const FIT_TO_SCREEN_PADDING = 100;
export const BINDING_PADDING = 12;
export const SNAP_DISTANCE = 5;

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

function updateChildPositions(
  group: GroupShape,
  shapes: Record<string, Shape>,
  moveDistance: number[]
) {
  group.children.forEach((child) => {
    const childShape = shapes[child];

    childShape.point = Vec.add(childShape.point, moveDistance);

    if (childShape.type === "group") {
      updateChildPositions(childShape, shapes, moveDistance);
    }
  });
}

export function packShapesIntoGroups(
  items: StorySidebarChildItem[],
  shapes: Record<string, Shape>
) {
  const boxes = [];

  for (const item of items) {
    if (item.type === "story") {
      if (item.story.type === "basic") {
        boxes.push(shapes[item.id]);
      }
      continue;
    } else {
      console.log(
        JSON.parse(JSON.stringify(item.children, null, 2)),
        JSON.parse(JSON.stringify(shapes, null, 2))
      );
      const childrenBoxes = packShapesIntoGroups(item.children, shapes);
      const group = shapes[item.id];
      const data = convertShapesToPotpackData(childrenBoxes);

      potpack(data);

      console.log({ data });
      data.forEach((i) => {
        const shape = shapes[i.id];

        const oldPoint = shape.point;
        shape.point = [i.x, i.y];
        const moveDistance = Vec.sub(shape.point, oldPoint);

        console.log({
          moveDistance,
          oldPoint: [oldPoint[0], oldPoint[1]],
          newPoint: [shape.point[0], shape.point[1]],
        });

        if (shape.type === "group") {
          updateChildPositions(shape, shapes, moveDistance);
        }
      });

      const largestBounds = data.reduce(
        (acc, i) => {
          if (i.x < acc.minX) {
            acc.minX = i.x;
          }
          if (i.y < acc.minY) {
            acc.minY = i.y;
          }
          if (i.x + i.w > acc.maxX) {
            acc.maxX = i.x + i.w;
          }
          if (i.y + i.h > acc.maxY) {
            acc.maxY = i.y + i.h;
          }

          return acc;
        },
        {
          minX: Infinity,
          minY: Infinity,
          maxX: 0,
          maxY: 0,
        }
      );

      group.size = [
        largestBounds.maxX - largestBounds.minX,
        largestBounds.maxY - largestBounds.minY,
      ];

      boxes.push(group);
    }
  }

  return boxes;
}

export function packTree(
  items: StorySidebarChildItem[],
  shapes: Record<string, Shape>
) {
  items.forEach((item) => {
    if (item.type === "tree") {
      packTree(item.children, shapes);
      packShapesIntoGroups(items, shapes);
    }
  });
}

function createShapesForTree(
  items: StorySidebarChildItem[],
  map: Record<string, Shape> = {},
  options: { shape: "docs" | "workbench" }
): Record<string, Shape> {
  const shapes = items.reduce((acc, item, index) => {
    if (item.name === "Canvas" || item.name === "Changelog") {
      return acc;
    }

    const childIndex = Object.keys(acc).length;

    if (item.type === "story") {
      if (item.story.type === "mdx") {
        return acc;
      }

      acc[item.id] = shapeUtils.docs.getShape({
        ...item,
        childIndex,
        grouping: item.story.grouping.split("/"),
        // size: [800, 400], // TODO for prod we should inject actual size so we don't have to render multiple times
      });
    } else if (item.type === "tree") {
      const storyChildren = item.children.filter(
        (child) => child.type === "story" && child.story.type === "basic"
      );
      const group = shapeUtils.group.getShape({
        ...item,
        childIndex: index,
      });

      acc[item.id] = group;
      storyChildren.forEach((child, index) => {
        if (child.type === "story" && child.story.type === "basic") {
          acc[child.id] = shapeUtils.docs.getShape({
            ...child,
            childIndex: index,
            grouping: child.story.grouping.split("/"),
            // size: [800, 400], // TODO for prod we should inject actual size so we don't have to render multiple times
          });
          group.children.push(child.id);
        }
      });

      const otherChildren = item.children.filter(
        (child) => child.type !== "story"
      );

      otherChildren.forEach((child) => {
        group.children.push(child.id);
      });

      createShapesForTree(otherChildren, acc, options);
    }

    return acc;
  }, map);

  packShapesIntoGroups(items, shapes);

  return shapes;
}

export const INITIAL_PAGE: TLPage<Shape, TLBinding> = {
  id: "canvas",
  shapes: createShapesForTree(tree, {}, { shape: "docs" }),
  bindings: {},
};

export const INITIAL_PAGE_STATE: TLPageState = {
  id: "page1",
  selectedIds: [],
  camera: {
    point: [0, 0],
    zoom: 1,
  },
  brush: null,
  pointedId: null,
  hoveredId: null,
  editingId: null,
  bindingId: null,
};

export const INITIAL_DATA = {
  id: "myDocument",
  version: VERSION,
  page: INITIAL_PAGE,
  tree,
  pageState: INITIAL_PAGE_STATE,
  overlays: {
    snapLines: [] as TLSnapLine[],
  },
  meta: {
    isDarkMode: false,
  },
  performanceMode: undefined as TLPerformanceMode | undefined,
};

export const INITIAL_WORKBENCH_PAGE = {
  ...INITIAL_DATA,
  page: {
    ...INITIAL_PAGE,
    shapes: createShapesForTree(tree, {}, { shape: "workbench" }),
  },
};

console.log("DEBUG START", tree, INITIAL_WORKBENCH_PAGE.page.shapes);

export type AppDocument = {
  id: string;
  page: TLPage<Shape>;
};

export type AppData = typeof INITIAL_DATA;

export type Action = S.Action<AppData>;

export type Condition = S.Condition<AppData>;

export const CanvasContext = createContext<{
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}>({
  containerRef: { current: null },
});
