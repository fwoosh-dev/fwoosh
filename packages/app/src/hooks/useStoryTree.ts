import React from "react";
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
              }
            : {
                name: level,
                id: levels.slice(0, index + 1).join("-"),
                children: [],
              };
          treeData.push(currentItem);
        }

        continue;
      }

      if ("children" in currentItem) {
        const childItem = currentItem.children.find(
          (item) => "name" in item && item.name === level
        );

        if (childItem && "children" in childItem) {
          currentItem = childItem;
        } else {
          const newItem = {
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
            (i) => "children" in i
          );
          const insertIndex =
            folderIndex > -1 ? folderIndex : currentItem.children.length;

          if ("code" in story) {
            currentItem.children.splice(insertIndex, 0, {
              name: story.title,
              story,
              id: story.slug,
            });
          } else {
            currentItem.children.splice(insertIndex, 0, {
              name: story.title,
              mdxFile: story.mdxFile,
              id: story.slug,
            });
          }
        }
      }
    }
  });

  return treeData;
}

export const useStoryTree = () => {
  const tree = React.useMemo(getStories, []);

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

  if ("story" in first) {
    return first.story;
  }

  if ("children" in first) {
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

    if ("children" in currentItem) {
      const childItem = currentItem.children.find(
        (item) => "name" in item && item.name === part
      );

      if (childItem && "children" in childItem) {
        currentItem = childItem;
      }
    }
  }

  return !currentItem
    ? undefined
    : "children" in currentItem
    ? currentItem.children
    : [currentItem];
};

export const hasActiveChild = (tree: StoryTree, slug: string): boolean => {
  return tree.children.some(
    (item) =>
      ("story" in item && item.story.slug === slug) ||
      ("children" in item && hasActiveChild(item, slug))
  );
};
