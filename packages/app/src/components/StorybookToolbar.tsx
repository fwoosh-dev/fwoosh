import React, { Suspense } from "react";
import { Toolbar, Spinner, HeaderBar, HeaderTitle } from "@fwoosh/components";
import { styled } from "@fwoosh/styling";
import { toolbarControls } from "@fwoosh/app/ui";
import { useId } from "@radix-ui/react-id";

import { ThemeToggle } from "./ThemeToggle";
import { config } from "@fwoosh/app/config";
import { useStoryId } from "@fwoosh/hooks";
import { useParameters } from "../hooks/useParameters";

const StoryToolbar = styled(Toolbar.Root, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "$1",
  flex: 1,
  height: "$12",
  flexShrink: 0,
});

const Split = styled("div", {
  flex: 1,
});

export const StorybookToolbar = () => {
  const storyId = useStoryId();
  const id = useId();
  const parameters = useParameters();
  const activeControls = toolbarControls.filter((Control) => {
    const paramValue = Control.paramKey
      ? parameters?.[Control.paramKey]
      : undefined;

    if ((Control.hideWithoutParams && !paramValue) || paramValue === false) {
      return false;
    }

    return true;
  });
  const storyControls = activeControls.filter((Control) => {
    return Control.scope === "story";
  });

  return (
    <HeaderBar>
      <HeaderTitle>{config.title}</HeaderTitle>
      {storyControls && storyId ? (
        <StoryToolbar>
          <Suspense fallback={<Spinner size={5} />}>
            {storyControls.map((Control) => (
              <Control key={Control.componentName} storyPreviewId={id} />
            ))}
          </Suspense>
        </StoryToolbar>
      ) : (
        <Split />
      )}
      <ThemeToggle />
    </HeaderBar>
  );
};
