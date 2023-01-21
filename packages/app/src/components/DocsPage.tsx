import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";
import { StoryBasicTreeItem } from "@fwoosh/types";
import { Spinner, ErrorBoundary } from "@fwoosh/components";
import { getStoryGroup } from "@fwoosh/utils";
import { tree } from "@fwoosh/app/stories";
import { useDocsPath } from "@fwoosh/hooks";

import { MDXPage } from "./MDXPage";
import { StoryDocsPage } from "./StoryDocsPage";

const DocsContent = React.memo(() => {
  const docsPath = useDocsPath();
  const [firstStory, ...restStories] = React.useMemo(() => {
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

  if (!firstStory) {
    return null;
  }

  if (firstStory.type === "story" && firstStory.story.type === "mdx") {
    return <MDXPage page={firstStory} />;
  }

  return (
    <StoryDocsPage
      stories={[firstStory as StoryBasicTreeItem, ...restStories]}
    />
  );
});

export const DocsPage = React.memo(() => {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname}>
      <Suspense fallback={<Spinner>Loading documentation...</Spinner>}>
        <DocsContent />
      </Suspense>
    </ErrorBoundary>
  );
});
