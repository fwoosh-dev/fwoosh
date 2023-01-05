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
          currentItem = !("code" in story)
            ? {
                name: level,
                id: levels.slice(0, index + 1).join("-"),
                mdxFile: story.mdxFile,
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
        } else {
          const newItem: StoryTree = {
            type: "tree",
            name: level,
            id: levels.slice(0, index + 1).join("-"),
            children: [],
          };
          currentItem.children.push(newItem);
          currentItem = newItem;
        }

        // Push the story as a leaf
        if (index === levels.length - 1 && currentItem) {
          const folderIndex = currentItem.children.findIndex(
            (i) => i.type === "tree"
          );
          const insertIndex =
            folderIndex > -1 ? folderIndex : currentItem.children.length;

          if ("code" in story) {
            currentItem.children.splice(insertIndex, 0, {
              name: story.title,
              story,
              id: story.slug,
              type: "story",
            });
          } else {
            currentItem.children.splice(insertIndex, 0, {
              name: story.title,
              mdxFile: story.mdxFile,
              id: story.slug,
              type: "mdx",
            });
          }
        }
      }
    }
  });

  return treeData;
}

const tree = getStories();

export const useStoryTree = () => {
  const { data = [] } = useQuery("storyTree", async () => {
    const res = await fetch("/sort", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tree),
    });
    const data = await res.json();

    return matchTreeSortingOrder(tree, data);
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
      (item.type === "tree" && hasActiveChild(item, slug))
  );
};
