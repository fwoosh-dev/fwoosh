import React, { Suspense } from "react";
import { stories } from "@fwoosh/app/stories";
import { useParams } from "react-router-dom";

import ErrorBoundary from "./ErrorBoundary";
import { Spinner } from "./Spinner";

export const Story = () => {
  const params = useParams<{ storyId: string }>();

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner delay={300} />}>
        {params.storyId ? (
          React.createElement(stories[params.storyId].component)
        ) : (
          <div>Story not found</div>
        )}
      </Suspense>
    </ErrorBoundary>
  );
};
