import React, { Suspense, useContext } from "react";
import { styled } from "@fwoosh/styling";
import { Spinner, Tabs, ErrorBoundary } from "@fwoosh/components";
import { panels } from "@fwoosh/app/ui";

import { StoryIdContext } from "./Story";
import { ParameterContext, useStoryId } from "@fwoosh/hooks";
import { stories } from "@fwoosh/app/stories";
import { useQuery } from "react-query";
import { resolveStoryMeta } from "@fwoosh/utils";

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
  const story = storyId ? stories[storyId] : undefined;

  const { data: parameters } = useQuery(
    `params-${storyId}`,
    async () => {
      const meta = await resolveStoryMeta(story?.meta);

      return {
        ...meta?.parameters,
        ...story?.component?._payload?._result?.default?.parameters,
      };
    },
    { suspense: false }
  );

  return (
    <ParameterContext.Provider value={parameters}>
      <Tabs.Root defaultValue={panels[0]?.componentName}>
        <TabsList>
          <Suspense fallback={<Spinner delay={3000} size={5} />}>
            {panels.map((Panel) => {
              if (
                Panel.hideWithoutParams &&
                !parameters?.[Panel.hideWithoutParams]
              ) {
                return null;
              }

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

        {panels.map((Panel) => {
          if (
            Panel.hideWithoutParams &&
            !parameters?.[Panel.hideWithoutParams]
          ) {
            return null;
          }

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
    </ParameterContext.Provider>
  );
};

export const ToolPanels = () => {
  return (
    <Suspense fallback={<Spinner delay={3000} />}>
      <ToolPanelsContent />
    </Suspense>
  );
};
