import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useId } from "@radix-ui/react-id";

import { Spinner, styled } from "@fwoosh/components";
import ErrorBoundary from "./ErrorBoundary";
import { useRender } from "../hooks/useRender";

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
  return <Root ref={ref} />;
});

export const Story = () => {
  const params = useParams<{ storyId: string }>();
  const contextId = React.useContext(StoryIdContext);
  const id = useId();

  return (
    <ErrorBoundary key={params.storyId}>
      <Suspense fallback={<Spinner>Loading story...</Spinner>}>
        {params.storyId ? (
          <StoryDiv slug={params.storyId} id={contextId || id} />
        ) : (
          <div>Story not found</div>
        )}
      </Suspense>
    </ErrorBoundary>
  );
};
