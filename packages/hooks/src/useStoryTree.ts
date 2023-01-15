import { tree } from "@fwoosh/app/stories";
import { StorySidebarChildItem, StoryTree, StoryData } from "@fwoosh/types";

export const useStoryTree = () => {
  return tree;
};

export const getFirstStory = (
  tree: StorySidebarChildItem[]
): StoryData | undefined => {
  const first = tree[0];

  if (!first) {
    return undefined;
  }

  if (first.type === "story") {
    return first.story;
  }

  if (first.type === "tree") {
    const child = getFirstStory(first.children);

    if (child) {
      return child;
    }
  }

  return getFirstStory(tree.slice(1));
};

export const getStoryGroup = (
  tree: StorySidebarChildItem[],
  path: string[]
) => {
  let currentItem: StorySidebarChildItem | undefined;

  for (const part of path) {
    if (!currentItem) {
      currentItem = tree.find((item) => item.name === part);
      continue;
    }

    if (currentItem.type === "tree") {
      const childItem = currentItem.children.find(
        (item) => "name" in item && item.name === part
      );

      if (childItem) {
        if (childItem.type === "tree") {
          currentItem = childItem;
        } else if (childItem.story.type === "mdx") {
          return [childItem];
        }
      } else {
        throw new Error(`Could not find page "${path.join("-")}"`);
      }
    }
  }

  return !currentItem
    ? undefined
    : currentItem.type === "tree"
    ? currentItem.children
    : [currentItem];
};

export const hasActiveChild = (tree: StoryTree, slug: string): boolean => {
  return tree.children.some((item) =>
    item.type === "tree" ? hasActiveChild(item, slug) : item.story.slug === slug
  );
};

const flattenTree = (tree: StorySidebarChildItem[]) => {
  const flatTree: Record<string, StoryData> = {};

  function flatten(item: StorySidebarChildItem) {
    if (item.type === "story") {
      flatTree[item.id] = item.story;
    } else if (item.type === "tree") {
      item.children.forEach(flatten);
    }
  }

  tree.forEach(flatten);

  return flatTree;
};

export const getPreviousStory = (tree: StorySidebarChildItem[], id: string) => {
  const flatTree = Object.entries(flattenTree(tree));
  const currentIndex = flatTree.findIndex(([key]) => key === id);

  if (currentIndex === -1) {
    return undefined;
  }

  if (currentIndex === 0) {
    return undefined;
  }

  return flatTree[currentIndex - 1][1];
};

export const getNextStory = (
  tree: StorySidebarChildItem[],
  id: string,
  findLastInGroup?: boolean
) => {
  const flatTree = Object.entries(flattenTree(tree));
  let currentIndex = flatTree.findIndex(([key]) => key === id);

  if (findLastInGroup) {
    while (
      flatTree[currentIndex + 1] &&
      flatTree[currentIndex + 1]?.[1].type === "basic" &&
      flatTree[currentIndex + 1][1].grouping ===
        flatTree[currentIndex][1].grouping
    ) {
      currentIndex++;
    }
  }

  if (currentIndex === -1) {
    return undefined;
  }

  if (currentIndex === flatTree.length - 1) {
    return undefined;
  }

  return flatTree[currentIndex + 1][1];
};
