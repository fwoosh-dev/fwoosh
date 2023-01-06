import { stories, StoryData } from "@fwoosh/app/stories";
import { StorySidebarChildItem, StoryTree } from "@fwoosh/app/ui";
import { useQuery } from "react-query";
import { matchTreeSortingOrder } from "@fwoosh/utils";

function getStories() {
  const treeData: StorySidebarChildItem[] = [];

  Object.values(stories).forEach((story) => {
    const { grouping } = story;
    const levels = grouping.split("/");
    let currentItem: StorySidebarChildItem | undefined;

    for (const [index, level] of levels.entries()) {
      // Set up the root level
      if (!currentItem) {
        currentItem = treeData.find((item) => item.name === level);

        if (!currentItem) {
          currentItem =
            story.type === "mdx" && levels.length === 1
              ? {
                  name: level,
                  id: levels.slice(0, index + 1).join("-"),
                  story,
                  type: "mdx",
                }
              : {
                  name: level,
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
          (item) => "name" in item && item.name === level
        );

        if (childItem && childItem.type === "tree") {
          currentItem = childItem;
        } else if (story.type !== "mdx" || levels.length > index + 1) {
          const newItem: StoryTree = {
            type: "tree",
            name: level,
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

export const getFirstStory = (tree: StorySidebarChildItem[]): StoryData => {
  const first = tree[0];

  if (first.type === "story") {
    return first.story;
  }

  if (first.type === "tree") {
    return getFirstStory(first.children);
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

      if (childItem && childItem.type === "tree") {
        currentItem = childItem;
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
