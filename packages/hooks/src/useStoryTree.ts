import { StoryData } from "@fwoosh/types";
import { stories } from "@fwoosh/app/stories";
import { StorySidebarChildItem, StoryTree } from "@fwoosh/app/ui";
import { useQuery } from "react-query";
import { matchTreeSortingOrder } from "@fwoosh/utils";

function getStories() {
  const treeData: StorySidebarChildItem[] = [];

  Object.values(stories).forEach((story) => {
    const { grouping } = story;
    const levels = grouping.split("/");
    let currentItem: StorySidebarChildItem | undefined;

    for (const [index, name] of levels.entries()) {
      // Set up the root level
      if (!currentItem) {
        currentItem = treeData.find((item) => item.name === name);

        if (!currentItem) {
          currentItem =
            story.type === "mdx" && levels.length === 1
              ? {
                  name,
                  id: levels.slice(0, index + 1).join("-"),
                  story,
                  type: "mdx",
                }
              : {
                  name,
                  id: levels.slice(0, index + 1).join("-"),
                  children: [],
                  type: "tree",
                };
          treeData.push(currentItem);
        }

        continue;
      }

      if (currentItem.type === "tree") {
        const childItem = currentItem.children.find(
          (item) => "name" in item && item.name === name
        );

        if (childItem && childItem.type === "tree") {
          currentItem = childItem;
        } else if (story.type !== "mdx" || levels.length > index + 1) {
          const newItem: StoryTree = {
            type: "tree",
            name,
            id: levels.slice(0, index + 1).join("-"),
            children: [],
          };
          currentItem.children.push(newItem);
          currentItem = newItem;
        }
      }
    }

    // Push the story as a leaf
    if (currentItem && currentItem.type === "tree") {
      if ("code" in story) {
        currentItem.children.push({
          name: story.title,
          story,
          id: story.slug,
          type: "story",
        });
      } else {
        const titleParts = story.title.split("/");
        currentItem.children.push({
          name: titleParts[titleParts.length - 1],
          story,
          id: story.slug,
          type: "mdx",
        });
      }
    }
  });

  return treeData;
}

const tree = getStories();

export const useStoryTree = () => {
  const { data = [] } = useQuery("storyTree", async () => {
    return new Promise<StorySidebarChildItem[]>((resolve) => {
      const socket = new WebSocket(
        `ws://localhost:${process.env.FWOOSH_PORT}/sort`
      );

      socket.addEventListener("open", () => {
        socket.send(JSON.stringify(tree));
      });

      socket.addEventListener("message", (event) => {
        resolve(matchTreeSortingOrder(tree, JSON.parse(event.data)));
      });
    });
  });

  return data;
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
        } else if (childItem.type === "mdx") {
          return [childItem];
        }
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
  return tree.children.some(
    (item) =>
      (item.type === "story" && item.story.slug === slug) ||
      (item.type === "mdx" && item.story.slug === slug) ||
      (item.type === "tree" && hasActiveChild(item, slug))
  );
};

const flattenTree = (tree: StorySidebarChildItem[]) => {
  const flatTree: Record<string, StoryData> = {};

  function flatten(item: StorySidebarChildItem) {
    if (item.type === "mdx") {
      flatTree[item.id] = item.story;
    } else if (item.type === "story") {
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
