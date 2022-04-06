import React, { Suspense } from "react";
import { render } from "@fwoosh/app/render";
import { useParams } from "react-router-dom";
import { useId } from "@radix-ui/react-id";

import ErrorBoundary from "./ErrorBoundary";
import { styled, Spinner } from "@fwoosh/components";

export const StoryIdContext = React.createContext<string | undefined>(
  undefined
);

const Root = styled("div", {
  position: "relative",
  flex: 1,
  overflow: "auto",
});

const StoryDiv = React.memo(({ slug, id }: { slug: string; id: string }) => {
  React.useEffect(() => {
    render(id, slug);
  }, [id, slug]);

  return <Root id={id} />;
});

export const Story = () => {
  const params = useParams<{ storyId: string }>();
  const contextId = React.useContext(StoryIdContext);
  const id = useId();

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        {params.storyId ? (
          <StoryDiv slug={params.storyId} id={contextId || id} />
        ) : (
          <div>Story not found</div>
        )}
      </Suspense>
    </ErrorBoundary>
  );
};
