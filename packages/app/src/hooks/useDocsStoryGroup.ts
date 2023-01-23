import { tree } from "@fwoosh/app/stories";
import { useDocsPath } from "@fwoosh/hooks";
import { getStoryGroup } from "@fwoosh/utils";
import { useMemo } from "react";

export function useDocsStoryGroup() {
  const docsPath = useDocsPath();
  return useMemo(() => {
    if (!docsPath) {
      return [];
    }

    const path = docsPath.split("-");
    const story = getStoryGroup(tree, path);

    if (!story) {
      throw new Error(`Could not find documentation page: ${docsPath}`);
    }

    return story;
  }, [docsPath]);
}
