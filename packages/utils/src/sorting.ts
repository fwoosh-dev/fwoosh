import { StorySidebarChildItem, StoryTree } from "@fwoosh/app/ui";

export function sortTree(
  tree: StorySidebarChildItem[],
  sortFn: (a: StorySidebarChildItem, b: StorySidebarChildItem) => number
): StorySidebarChildItem[] {
  return tree
    .map((item) => {
      if (item.type === "tree") {
        return {
          ...item,
          children: sortTree(item.children, sortFn),
        };
      }

      return item;
    })
    .sort(sortFn);
}

export function matchTreeSortingOrder(
  a: StorySidebarChildItem[],
  b: StorySidebarChildItem[]
): StorySidebarChildItem[] {
  const withSortedChildren = a.map((item) => {
    if (item.type === "tree") {
      const bItem = b.find((bItem) => bItem.id === item.id);

      return {
        ...item,
        children: matchTreeSortingOrder(
          item.children,
          (bItem as StoryTree).children
        ),
      };
    }

    return item;
  });

  return withSortedChildren.sort((aItem1, aItem2) => {
    const bItem1 = b.find((bItem) => bItem.id === aItem1.id);
    const bItem2 = b.find((bItem) => bItem.id === aItem2.id);

    if (!bItem1) {
      return 1;
    }

    if (!bItem2) {
      return -1;
    }

    return b.indexOf(bItem1) - b.indexOf(bItem2);
  });
}
