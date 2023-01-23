import React, { Suspense } from "react";
import { Spinner } from "@fwoosh/components";
import { CONTENT_ID } from "@fwoosh/utils";

import { ThemeToggle } from "../ThemeToggle";
import { useToolbarControls } from "../../hooks/useToolbarControls";
import { ParameterContext, useParameters } from "@fwoosh/hooks";

export const GlobalToolbarItems = () => {
  const { globalControls } = useToolbarControls();
  const parameters = useParameters();

  return (
    <ParameterContext.Provider value={parameters}>
      <Suspense fallback={<Spinner size={5} />}>
        {globalControls.map((Control) => (
          <Control key={Control.componentName} storyPreviewId={CONTENT_ID} />
        ))}
      </Suspense>
      <ThemeToggle />
    </ParameterContext.Provider>
  );
};
