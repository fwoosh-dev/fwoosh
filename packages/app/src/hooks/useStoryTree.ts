import React from "react";
import { dset } from "dset/merge";
import dlv from "dlv";
import { stories, Stories } from "@fwoosh/app/stories";

export interface StoryTree {
  [key: string]: StoryTree | Stories[string][];
}

export const useStoryTree = (): StoryTree => {
  const tree = React.useMemo(() => {
    const tree = {};

    Object.values(stories).forEach((story) => {
      const { grouping } = story;
      const levels = grouping.split("/");
      const array = dlv(tree, [...levels]);

      if (array) {
        array.push(story);
      } else {
        dset(tree, [...levels, 0], story);
      }
    });

    return tree;
  }, []);

  return tree;
};
