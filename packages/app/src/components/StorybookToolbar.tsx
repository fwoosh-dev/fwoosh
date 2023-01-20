import React, { Suspense, useContext } from "react";
import { Toolbar, Spinner, HeaderBar, HeaderTitle } from "@fwoosh/components";
import { config } from "@fwoosh/app/config";
import { useStoryId } from "@fwoosh/hooks";

import { ThemeToggle } from "./ThemeToggle";
import { useToolbarControls } from "../hooks/useToolbarControls";
import { GlobalToolbar, StoryToolbar } from "./toolbar";
import { StoryIdContext } from "./Story";

export const StorybookToolbar = () => {
  const storyId = useStoryId();
  const id = useContext(StoryIdContext);
  const { storyControls, globalControls } = useToolbarControls();

  return (
    <HeaderBar>
      <HeaderTitle>{config.title}</HeaderTitle>
      <GlobalToolbar />

      {storyId && (
        <StoryToolbar>
          <Suspense fallback={<Spinner size={5} />}>
            {storyControls.map((Control) => (
              <Control key={Control.componentName} storyPreviewId={id} />
            ))}
          </Suspense>
        </StoryToolbar>
      )}

      <GlobalToolbar>
        <Suspense fallback={<Spinner size={5} />}>
          {globalControls.map((Control) => (
            <Control key={Control.componentName} storyPreviewId={id} />
          ))}
        </Suspense>

        <Toolbar.Button asChild>
          <ThemeToggle />
        </Toolbar.Button>
      </GlobalToolbar>
    </HeaderBar>
  );
};
