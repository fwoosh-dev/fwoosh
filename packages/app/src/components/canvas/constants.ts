import { createContext } from "react";
import { tree } from "@fwoosh/app/stories";
import type { S } from "@state-designer/react";
import {
  TLBinding,
  TLPage,
  TLPageState,
  TLPerformanceMode,
  TLSnapLine,
} from "@tldraw/core";
import { StorySidebarChildItem, StoryTree } from "@fwoosh/types";

import { Shape, shapeUtils } from "./shapes";
import { createGroup } from "./utils";

export const VERSION = 1;
export const PERSIST_DATA = true;
export const FIT_TO_SCREEN_PADDING = 100;
export const BINDING_PADDING = 12;
export const SNAP_DISTANCE = 5;

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
      const group = createGroup({
        id: item.id,
        childIndex: index,
      });

      acc[item.id] = group;

      // PROBLEM: when there are both stories and groups, the stories are overlapping the groups

      storyChildren.forEach((child, index) => {
        if (child.type === "story" && child.story.type === "basic") {
          // acc[child.id] = shapeUtils.docs.getShape({
          //   ...child,
          //   childIndex: index,
          //   grouping: child.story.grouping.split("/"),
          //   // size: [800, 400], // TODO for prod we should inject actual size so we don't have to render multiple times
          // });
          group.stories.push(child.id);
        }
      });

      const otherChildren = item.children.filter(
        (child): child is StoryTree => child.type === "tree"
      );

      otherChildren.forEach((child) => {
        group.childIds.push(child.id);
      });

      createShapesForTree(otherChildren, acc, options);
    }

    return acc;
  }, map);

  // packShapesIntoGroups(items, shapes);

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
  pageState: INITIAL_PAGE_STATE,
  overlays: {
    snapLines: [] as TLSnapLine[],
  },
  meta: {
    storyId: "",
    containerRef: { current: null },
    tree,
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

export type CanvasMeta = {
  storyId: string | undefined;
  containerRef: React.MutableRefObject<HTMLElement | null>;
  tree: typeof tree;
};
