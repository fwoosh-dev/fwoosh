import { StorySidebarChildItem, StoryTree, Stories } from "@fwoosh/types";

export function getStoryTree(stories: Stories) {
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
                  type: "story",
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
      if (story.type === "basic") {
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
          type: "story",
        });
      }
    }
  });

  return treeData;
}
