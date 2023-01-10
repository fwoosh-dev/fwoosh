import React, { Suspense, useContext } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@fwoosh/styling";
import { Spinner, Tabs, ErrorBoundary } from "@fwoosh/components";
import { panels } from "@fwoosh/app/ui";

import { StoryIdContext } from "./Story";

const TabsList = styled(Tabs.List, {
  height: "$12",
});

const TabContent = styled(Tabs.Content, {
  display: "flex",
  text: "sm",
});

export const ToolPanels = () => {
  const id = useContext(StoryIdContext);
  const params = useParams<{ storyId: string }>();

  return (
    <Tabs.Root defaultValue={panels[0]?.componentName}>
      <TabsList>
        <Suspense fallback={<Spinner delay={3000} size={5} />}>
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
        </Suspense>
      </TabsList>

      {panels.map((Panel) => (
        <TabContent
          key={`content-${Panel.componentName}-${params.storyId}`}
          value={Panel.componentName}
        >
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Panel storyPreviewId={id} />
            </Suspense>
          </ErrorBoundary>
        </TabContent>
      ))}
    </Tabs.Root>
  );
};
