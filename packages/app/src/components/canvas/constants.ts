import { createContext } from "react";
import { tree } from "@fwoosh/app/stories";
import type { S } from "@state-designer/react";
import {
  TLPage,
  TLPageState,
  TLPerformanceMode,
  TLSnapLine,
} from "@tldraw/core";
import { StorySidebarChildItem } from "@fwoosh/types";

import { Shape, shapeUtils } from "./shapes/index.js";
import { createGroup } from "./utils";

export const VERSION = 1;
export const PERSIST_DATA = true;
export const FIT_TO_SCREEN_PADDING = 100;
export const BINDING_PADDING = 12;
export const SNAP_DISTANCE = 5;

declare global {
  interface Window {
    FWOOSH_DOCS_CANVAS_SHAPES: Record<string, Shape>;
    FWOOSH_WORKBENCH_CANVAS_SHAPES: Record<string, Shape>;
  }
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
        if (options.shape === "docs") {
          const group = createGroup({
            id: item.id,
            childIndex: index,
          });
          group.stories.push(item.id);
          acc[item.id] = group;
        }

        return acc;
      }

      // Only show render stories as nodes in workbench mode
      if (options.shape === "workbench") {
        acc[item.id] = shapeUtils.story.getShape({
          ...item,
          childIndex,
          grouping: item.story.grouping.split("/"),
        });
      }
    } else if (item.type === "tree") {
      const group = createGroup({
        id: item.id,
        childIndex: index,
      });

      const treeChildren: StorySidebarChildItem[] = [];

      item.children.forEach((child, index) => {
        if (child.type === "story") {
          if (child.story.type === "basic" && options.shape === "workbench") {
            acc[child.id] = shapeUtils.story.getShape({
              ...child,
              childIndex: index,
              grouping: child.story.grouping.split("/"),
            });
            group.stories.push(child.id);
            return;
          }

          if (child.story.type === "basic" && options.shape === "docs") {
            group.stories.push(child.id);
            return;
          }

          if (child.story.type === "mdx" && options.shape === "docs") {
            // ???
            group.stories.push(child.id);
            return;
          }
        } else {
          group.childIds.push(child.id);
          treeChildren.push(child);
        }
      });

      createShapesForTree(treeChildren, acc, options);

      if (group.stories.length > 0 || group.childIds.some((id) => acc[id])) {
        acc[item.id] = group;
      }
    }

    return acc;
  }, map);

  return shapes;
}

export const INITIAL_PAGE: TLPage<Shape> = {
  id: "canvas",
  shapes: window.FWOOSH_DOCS_CANVAS_SHAPES
    ? window.FWOOSH_DOCS_CANVAS_SHAPES
    : createShapesForTree(tree, {}, { shape: "docs" }),
  bindings: {},
};

export const INITIAL_PAGE_STATE: TLPageState = {
  id: "page1",
  selectedIds: [],
  camera: {
    point: [100, 100],
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
    hasMeasured: false,
    mode: "docs",
  } as CanvasMeta,
  performanceMode: undefined as TLPerformanceMode | undefined,
};

export const INITIAL_WORKBENCH_PAGE = {
  ...INITIAL_DATA,
  meta: {
    storyId: "",
    containerRef: { current: null },
    tree,
    hasMeasured: false,
    mode: "workbench",
  } as CanvasMeta,
  page: {
    ...INITIAL_PAGE,
    shapes: window.FWOOSH_WORKBENCH_CANVAS_SHAPES
      ? window.FWOOSH_WORKBENCH_CANVAS_SHAPES
      : createShapesForTree(tree, {}, { shape: "workbench" }),
  },
};

export interface AppDocument {
  id: string;
  page: TLPage<Shape>;
}

export type AppData = typeof INITIAL_DATA;

export type Action = S.Action<AppData>;

export type Condition = S.Condition<AppData>;

export const CanvasContext = createContext<{
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}>({
  containerRef: { current: null },
});

export interface CanvasMeta {
  storyId: string | undefined;
  containerRef: React.MutableRefObject<HTMLElement | null>;
  tree: typeof tree;
  mode: "docs" | "workbench";
}
