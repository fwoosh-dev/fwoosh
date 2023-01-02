import React from "react";
import {
  BasicStoryData,
  MDXStoryData,
  stories,
  StoryData,
} from "@fwoosh/app/stories";

export interface StoryTreeItem {
  story: BasicStoryData;
  id: string;
  name: string;
}

export interface MDXPageTreeItem {
  mdxFile: MDXStoryData;
  id: string;
  name: string;
}

export type StorySidebarChildItem = StoryTree | StoryTreeItem | MDXPageTreeItem;

export interface StoryTree {
  name: string;
  id: string;
  children: StorySidebarChildItem[];
}

export type StorySidebarItem = StoryTree | MDXPageTreeItem;

interface UseStoryTreeOptions {
  includeStories?: boolean;
}

export const useStoryTree = ({
  includeStories = true,
}: UseStoryTreeOptions = {}) => {
  return React.useMemo(() => {
    const treeData: StorySidebarItem[] = [];

    console.log({ stories });

    Object.values(stories).forEach((story) => {
      const { grouping } = story;
      const levels = grouping.split("/");
      let currentItem: StorySidebarItem | undefined;

      for (const [index, level] of levels.entries()) {
        // Set up the root item
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
          if (includeStories && index === levels.length - 1 && currentItem) {
            const folderIndex = currentItem.children.findIndex(
              (i) => "children" in i
            );
            const insertIndex =
              folderIndex > -1 ? folderIndex : currentItem.children.length;

            currentItem.children.splice(
              insertIndex,
              0,
              "code" in story
                ? {
                    name: story.title,
                    story,
                    id: story.slug,
                  }
                : {
                    name: story.title,
                    mdxFile: story.mdxFile,
                    id: story.slug,
                  }
            );
          }
        }
      }
    });

    console.log({ treeData });
    return treeData;
  }, [includeStories]);
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

export const getStoryGroup = (tree: StorySidebarItem[], path: string[]) => {
  let currentItem: StorySidebarItem | undefined;

  console.log({ tree, path });
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

  console.log({
    currentItem,
  });

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
