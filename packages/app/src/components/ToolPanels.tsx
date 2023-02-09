import React, { Suspense, useContext } from "react";
import { styled } from "@fwoosh/styling";
import { Spinner, Tabs, ErrorBoundary } from "@fwoosh/components";
import { panels } from "@fwoosh/app/ui";

import { StoryIdContext } from "./Story";
import { useParameters } from "@fwoosh/hooks";

const TabsList = styled(Tabs.List, {
  height: "$12",
  borderWidth: "$sm",
  borderStyle: "$solid",
  borderColor: "$gray6",
  borderLeft: "none",
  borderRight: "none",
});

const TabContent = styled(Tabs.Content, {
  display: "flex",
  text: "sm",
  width: "100%",
  height: "100%",
  maxHeight: 400,
});

interface ToolPanelsContentProps {
  storySlug: string;
}

const ToolPanelsContent = ({ storySlug }: ToolPanelsContentProps) => {
  const storyPreviewId = useContext(StoryIdContext);
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
    <Tabs.Root
      defaultValue={
        localStorage.getItem("fwoosh:active-panel") || panels[0]?.componentName
      }
      onValueChange={(id) => localStorage.setItem("fwoosh:active-panel", id)}
    >
      <TabsList>
        <Suspense fallback={<Spinner delay={3000} size={5} />}>
          {shownPanel.map((Panel) => {
            return (
              <Tabs.Trigger
                key={`trigger-${Panel.componentName}`}
                value={Panel.componentName}
              >
                <Panel.displayName
                  storyPreviewId={storyPreviewId}
                  storyId={storySlug}
                />
              </Tabs.Trigger>
            );
          })}
        </Suspense>
      </TabsList>

      {shownPanel.map((Panel) => {
        return (
          <TabContent
            key={`content-${Panel.componentName}-${storySlug}`}
            value={Panel.componentName}
          >
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Panel storyPreviewId={storyPreviewId} storyId={storySlug} />
              </Suspense>
            </ErrorBoundary>
          </TabContent>
        );
      })}
    </Tabs.Root>
  );
};

interface ToolPanelsProps {
  storySlug: string;
}

export const ToolPanels = ({ storySlug }: ToolPanelsProps) => {
  return (
    <Suspense fallback={<Spinner delay={3000} />}>
      <ToolPanelsContent storySlug={storySlug} />
    </Suspense>
  );
};
