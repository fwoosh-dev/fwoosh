import React, { Suspense } from "react";
import { Toolbar, Spinner } from "@fwoosh/components";
import { useStoryId } from "@fwoosh/hooks";

import { ThemeToggle } from "./ThemeToggle";
import { GlobalToolbarControls, ToolbarControls } from "./toolbar";
import { GlobalToolbarItems } from "./toolbar/GlobalToolbarItems";
import { WorkbenchToolbarItems } from "./toolbar/WorkbenchToolbarItems";

export const WorkbenchToolbar = () => {
  const storyId = useStoryId();

  return (
    <>
      <GlobalToolbarControls />

      {storyId && (
        <ToolbarControls>
          <Suspense fallback={<Spinner size={5} />}>
            <WorkbenchToolbarItems />
          </Suspense>
        </ToolbarControls>
      )}

      <GlobalToolbarControls>
        <Suspense fallback={<Spinner size={5} />}>
          <GlobalToolbarItems />
        </Suspense>
      </GlobalToolbarControls>
    </>
  );
};
