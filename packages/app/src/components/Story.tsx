import React, { Suspense } from "react";
import { render } from "@fwoosh/app/render";
import { toolbarControls } from "@fwoosh/app/ui";
import { useParams } from "react-router-dom";
import { useId } from "@radix-ui/react-id";

import ErrorBoundary from "./ErrorBoundary";
import { styled, Toolbar, Spinner } from "@fwoosh/components";

const StoryToolbar = styled(Toolbar.Root, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  height: "$12",
  borderBottom: "1px solid $gray4",
});

const StoryDiv = React.memo(({ slug, id }: { slug: string; id: string }) => {
  React.useEffect(() => {
    render(id, slug);
  }, [id, slug]);

  return <div id={id} />;
});

export const Story = () => {
  const params = useParams<{ storyId: string }>();
  const id = useId();

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner delay={300} />}>
        <StoryToolbar>
          {toolbarControls.map((Control) => (
            <Control key={(Control as any).displayName} storyPreviewId={id} />
          ))}
        </StoryToolbar>
        {params.storyId ? (
          <StoryDiv slug={params.storyId} id={id} />
        ) : (
          <div>Story not found</div>
        )}
      </Suspense>
    </ErrorBoundary>
  );
};
