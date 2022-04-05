import React, { Suspense } from "react";
import { render } from "@fwoosh/app/render";
import { toolbarControls, panels } from "@fwoosh/app/ui";
import { useParams } from "react-router-dom";
import { useId } from "@radix-ui/react-id";

import ErrorBoundary from "./ErrorBoundary";
import { styled, Toolbar, Spinner, Tabs } from "@fwoosh/components";

const StoryToolbar = styled(Toolbar.Root, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  height: "$12",
  borderBottom: "1px solid $gray4",
  flexShrink: 0,
});

const PanelContainer = styled("div", {
  height: 400,
  borderTop: "1px solid $gray4",
});

const Wrapper = styled("div", {
  position: "relative",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

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
  const id = useId();

  console.log({ panels });

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner delay={300} />}>
        <Wrapper>
          {toolbarControls.length > 0 && (
            <StoryToolbar>
              {toolbarControls.map((Control) => (
                <Control key={Control.componentName} storyPreviewId={id} />
              ))}
            </StoryToolbar>
          )}

          {params.storyId ? (
            <StoryDiv slug={params.storyId} id={id} />
          ) : (
            <div>Story not found</div>
          )}

          {panels.length > 0 && (
            <PanelContainer>
              <Tabs.Root defaultValue={panels[0]?.componentName}>
                <Tabs.List>
                  {panels.map((Panel) => {
                    return (
                      <Tabs.Trigger
                        key={`trigger-${Panel.componentName}`}
                        value={Panel.componentName}
                      >
                        <Panel.displayName />
                      </Tabs.Trigger>
                    );
                  })}
                </Tabs.List>

                {panels.map((Panel) => (
                  <Tabs.Content
                    key={`content-${Panel.componentName}`}
                    value={Panel.componentName}
                  >
                    <ErrorBoundary>
                      <Suspense fallback={<Spinner />}>
                        <Panel storyPreviewId={id} />
                      </Suspense>
                    </ErrorBoundary>
                  </Tabs.Content>
                ))}
              </Tabs.Root>
            </PanelContainer>
          )}
        </Wrapper>
      </Suspense>
    </ErrorBoundary>
  );
};
