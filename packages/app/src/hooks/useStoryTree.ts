import React from "react";
import { stories, Stories } from "@fwoosh/app/stories";

export interface StoryTreeItem {
  story: Stories[string];
  id: string;
  name: string;
}

export interface StoryTree {
  name: string;
  id: string;
  children: (StoryTree | StoryTreeItem)[];
}

interface UseStoryTreeOptions {
  includeStories?: boolean;
}

export const useStoryTree = ({
  includeStories = true,
}: UseStoryTreeOptions = {}) => {
  return React.useMemo((): StoryTree[] => {
    const treeData: StoryTree[] = [];

    Object.values(stories).forEach((story) => {
      const { grouping } = story;
      const levels = grouping.split("/");
      let currentItem: StoryTree | undefined;

      for (const [index, level] of levels.entries()) {
        // Set up the root item
        if (!currentItem) {
          currentItem = treeData.find((item) => item.name === level);

          if (!currentItem) {
            currentItem = {
              name: level,
              id: levels.slice(0, index + 1).join("-"),
              children: [],
            };
            treeData.push(currentItem);
          }

          continue;
        }

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
        if (includeStories && index === levels.length - 1 && currentItem) {
          const folderIndex = currentItem.children.findIndex(
            (i) => "children" in i
          );
          const insertIndex =
            folderIndex > -1 ? folderIndex : currentItem.children.length;

          currentItem.children.splice(insertIndex, 0, {
            name: story.title,
            story,
            id: story.slug,
          });
        }
      }
    });

    return treeData;
  }, [includeStories]);
};

export const getFirstStory = (
  tree: (StoryTree | StoryTreeItem)[]
): Stories[string] => {
  const first = tree[0];

  if ("story" in first) {
    return first.story;
  }

  return getFirstStory(first.children);
};

export const getStoryGroup = (tree: StoryTree[], path: string[]) => {
  let currentItem: StoryTree | undefined;

  for (const part of path) {
    if (!currentItem) {
      currentItem = tree.find((item) => item.name === part);
      continue;
    }

    const childItem = currentItem.children.find(
      (item) => "name" in item && item.name === part
    );

    if (childItem && "children" in childItem) {
      currentItem = childItem;
    }
  }

  return currentItem?.children;
};

export const hasActiveChild = (tree: StoryTree, slug: string): boolean => {
  return tree.children.some(
    (item) =>
      ("story" in item && item.story.slug === slug) ||
      ("children" in item && hasActiveChild(item, slug))
  );
};
