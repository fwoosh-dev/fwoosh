import React from "react";
import { useParams } from "react-router-dom";
import { useId } from "@radix-ui/react-id";

import { styled } from "@fwoosh/styling";
import { ErrorBoundary } from "@fwoosh/components";
import { useRender } from "../hooks/useRender";
import { stories } from "@fwoosh/app/stories";
import { Helmet } from "react-helmet-async";

export const StoryIdContext = React.createContext<string | undefined>(
  undefined
);

const Root = styled("div", {
  position: "relative",
  flex: 1,
  overflow: "auto",
  height: "100%",
  width: "100%",
});

const StoryDiv = React.memo(({ slug, id }: { slug: string; id: string }) => {
  const ref = useRender({ id, slug });
  const story = stories[slug];
  const groups = story.grouping.split("/");

  return (
    <>
      <Helmet>
        <title>
          {story.title} - {groups.slice(-2).join("/")}
        </title>
      </Helmet>
      <Root ref={ref} />
    </>
  );
});

export const Story = () => {
  const params = useParams<{ storyId: string }>();
  const contextId = React.useContext(StoryIdContext);
  const id = useId();

  return (
    <ErrorBoundary key={params.storyId}>
      {params.storyId ? (
        <StoryDiv slug={params.storyId} id={contextId || id} />
      ) : (
        <div>Story not found</div>
      )}
    </ErrorBoundary>
  );
};
