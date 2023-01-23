import { StorySidebarChildItem } from "@fwoosh/types";
import { NodeApi } from "react-arborist";

export const getFirstRenderableChild = (
  node: NodeApi<StorySidebarChildItem>,
  { isWorkbench }: { isWorkbench: boolean }
) => {
  let currentNode = node.next;

  while (currentNode?.next) {
    if (
      currentNode.data.type !== "tree" ||
      (!isWorkbench && currentNode.data.children.length > 0)
    ) {
      break;
    }

    currentNode = currentNode.next;
  }

  if (!currentNode || currentNode.data.type === "tree") {
    return "";
  }

  if (isWorkbench) {
    return currentNode.data.story.type === "basic"
      ? currentNode.data.story.slug
      : `docs/${currentNode.data.story.slug}`;
  }

  return currentNode.data.story.type === "basic"
    ? "?"
    : `${currentNode.data.story.slug}`;
};
