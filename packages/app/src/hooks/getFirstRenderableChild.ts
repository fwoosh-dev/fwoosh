import { StorySidebarChildItem } from "@fwoosh/types";
import { NodeApi } from "react-arborist";

export const getFirstRenderableChild = (
  node: NodeApi<StorySidebarChildItem>,
  { isStorybook }: { isStorybook: boolean }
) => {
  let currentNode = node.next;

  while (currentNode?.next) {
    if (
      currentNode.data.type !== "tree" ||
      (!isStorybook && currentNode.data.children.length > 0)
    ) {
      break;
    }

    currentNode = currentNode.next;
  }

  if (!currentNode || currentNode.data.type === "tree") {
    return "";
  }

  if (isStorybook) {
    return currentNode.data.type === "story"
      ? currentNode.data.story.slug
      : `docs/${currentNode.data.story.slug}`;
  }

  return currentNode.data.type === "story"
    ? "?"
    : `${currentNode.data.story.slug}`;
};
