import React, { Suspense, useContext } from "react";
import { Toolbar, Spinner } from "@fwoosh/components";
import { ParameterContext, useStoryId } from "@fwoosh/hooks";

import { ThemeToggle } from "./ThemeToggle";
import { useToolbarControls } from "../hooks/useToolbarControls";
import { GlobalToolbar, ToolbarControls } from "./toolbar";
import { StoryIdContext } from "./Story";
import { useParameters } from "../hooks/useParameters";

export const WorkbenchToolbar = () => {
  const storyId = useStoryId();
  const id = useContext(StoryIdContext);
  const { storyControls, globalControls } = useToolbarControls();
  const parameters = useParameters();

  return (
    <ParameterContext.Provider value={parameters}>
      <GlobalToolbar />

      {storyId && (
        <ToolbarControls>
          <Suspense fallback={<Spinner size={5} />}>
            {storyControls.map((Control) => (
              <Control key={Control.componentName} storyPreviewId={id} />
            ))}
          </Suspense>
        </ToolbarControls>
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
    </ParameterContext.Provider>
  );
};
