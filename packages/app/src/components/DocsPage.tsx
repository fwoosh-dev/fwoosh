import * as React from "react";
import { useLocation } from "react-router-dom";
import { StoryBasicTreeItem } from "@fwoosh/types";
import { Spinner, ErrorBoundary } from "@fwoosh/components";

import { MDXPage } from "./MDXPage";
import { StoryDocsPage } from "./StoryDocsPage";
import { useDocsStoryGroup } from "../hooks/useDocsStoryGroup";
import { useDocsPath } from "@fwoosh/hooks";

const DocsContent = React.memo(function DocsContent() {
  const [firstStory, ...restStories] = useDocsStoryGroup();
  const docsPath = useDocsPath();
  const nameParts = docsPath?.split("-") ?? [];
  const name = nameParts[nameParts.length - 1];

  if (!firstStory) {
    return null;
  }

  if (firstStory.type === "story" && firstStory.story.type === "mdx") {
    return <MDXPage page={firstStory} />;
  }

  return (
    <StoryDocsPage
      name={name}
      stories={[firstStory as StoryBasicTreeItem, ...restStories]}
    />
  );
});

export const DocsPage = React.memo(function DocsPage() {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname}>
      <React.Suspense fallback={<Spinner>Loading documentation...</Spinner>}>
        <DocsContent />
      </React.Suspense>
    </ErrorBoundary>
  );
});
