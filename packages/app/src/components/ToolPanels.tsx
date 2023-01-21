import React, { Suspense, useContext } from "react";
import { styled } from "@fwoosh/styling";
import { Spinner, Tabs, ErrorBoundary } from "@fwoosh/components";
import { panels } from "@fwoosh/app/ui";

import { StoryIdContext } from "./Story";
import { useParameters, useStoryId } from "@fwoosh/hooks";

const TabsList = styled(Tabs.List, {
  height: "$12",
});

const TabContent = styled(Tabs.Content, {
  display: "flex",
  text: "sm",
  width: "100%",
  height: "100%",
});

const ToolPanelsContent = () => {
  const id = useContext(StoryIdContext);
  const storyId = useStoryId();
  const parameters = useParameters();

  const shownPanel = panels.filter((Panel) => {
    const paramValue = Panel.paramKey
      ? parameters?.[Panel.paramKey]
      : undefined;

    if ((Panel.hideWithoutParams && !paramValue) || paramValue === false) {
      return false;
    }

    return true;
  });

  return (
    <Tabs.Root defaultValue={panels[0]?.componentName}>
      <TabsList>
        <Suspense fallback={<Spinner delay={3000} size={5} />}>
          {shownPanel.map((Panel) => {
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

      {shownPanel.map((Panel) => {
        return (
          <TabContent
            key={`content-${Panel.componentName}-${storyId}`}
            value={Panel.componentName}
          >
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Panel storyPreviewId={id} />
              </Suspense>
            </ErrorBoundary>
          </TabContent>
        );
      })}
    </Tabs.Root>
  );
};

export const ToolPanels = () => {
  return (
    <Suspense fallback={<Spinner delay={3000} />}>
      <ToolPanelsContent />
    </Suspense>
  );
};
