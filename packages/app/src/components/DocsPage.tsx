import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";
import { StoryBasicTreeItem } from "@fwoosh/types";
import { Spinner, ErrorBoundary } from "@fwoosh/components";

import { MDXPage } from "./MDXPage";
import { StoryDocsPage } from "./StoryDocsPage";
import { useDocsStoryGroup } from "../hooks/useDocsStoryGroup";

const DocsContent = React.memo(() => {
  const [firstStory, ...restStories] = useDocsStoryGroup();

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
