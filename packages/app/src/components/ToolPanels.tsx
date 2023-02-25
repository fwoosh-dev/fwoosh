import React, { Suspense, useContext, useRef } from "react";
import { styled } from "@fwoosh/styling";
import { Spinner, Tabs, ErrorBoundary } from "@fwoosh/components";
import { panels } from "@fwoosh/app/ui";
import useLayoutEffect from "@react-hook/passive-layout-effect";

import { StoryIdContext } from "./Story";
import { useIsDocs, useParameters } from "@fwoosh/hooks";

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
});
const TabRoot = styled(Tabs.Root, {
  flex: 1,
  minHeight: 0,
});

interface ToolPanelsContentProps {
  storySlug: string;
}

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useLayoutEffect(() => {
    ref.current = value || ref.current;
  });
  return ref.current;
}

const ToolPanelsContent = ({ storySlug }: ToolPanelsContentProps) => {
  const storyPreviewId = useContext(StoryIdContext);
  const currentParameters = useParameters();
  const previousParams = usePrevious(currentParameters);
  const parameters = currentParameters ?? previousParams;
  const isDocs = useIsDocs();

  const shownPanels = panels.filter((Panel) => {
    const paramValue = Panel.paramKey
      ? parameters?.[Panel.paramKey]
      : undefined;

    if (
      (Panel.hideWithoutParams && !paramValue) ||
      paramValue === false ||
      (Panel.hideInDocs && isDocs)
    ) {
      return false;
    }

    return true;
  });

  const defaultValue =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("fwoosh:active-panel") ??
        shownPanels[0]?.componentName
      : shownPanels[0]?.componentName;

  const onChange = (id: string) => {
    if (typeof localStorage === "undefined") {
      return;
    }

    localStorage.setItem("fwoosh:active-panel", id);
  };

  return (
    <TabRoot defaultValue={defaultValue} onValueChange={onChange}>
      <TabsList>
        <Suspense fallback={<Spinner delay={3000} size={5} />}>
          {parameters &&
            shownPanels.map((Panel) => {
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

      {shownPanels.map((Panel) => {
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
    </TabRoot>
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
