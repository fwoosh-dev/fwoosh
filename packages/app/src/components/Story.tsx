import React, { Suspense } from "react";
import { render } from "@fwoosh/app/render";
import { useParams } from "react-router-dom";
import { useId } from "@radix-ui/react-id";

import ErrorBoundary from "./ErrorBoundary";
import { Spinner } from "./Spinner";

const StoryDiv = React.memo(({ slug }: { slug: string }) => {
  const id = useId();

  React.useEffect(() => {
    render(id, slug);
  }, [id, slug]);

  return <div id={id} />;
});

export const Story = () => {
  const params = useParams<{ storyId: string }>();

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner delay={300} />}>
        {params.storyId ? (
          <StoryDiv slug={params.storyId} />
        ) : (
          <div>Story not found</div>
        )}
      </Suspense>
    </ErrorBoundary>
  );
};
