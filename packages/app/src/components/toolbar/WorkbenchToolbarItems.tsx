import React, { Suspense, useContext } from "react";
import { Spinner } from "@fwoosh/components";

import { useToolbarControls } from "../../hooks/useToolbarControls";
import { StoryIdContext } from "../Story";
import { useParameters } from "../../hooks/useParameters";
import { ParameterContext } from "@fwoosh/hooks";

export const WorkbenchToolbarItems = () => {
  const id = useContext(StoryIdContext);
  const { storyControls } = useToolbarControls();
  const parameters = useParameters();

  return (
    <ParameterContext.Provider value={parameters}>
      <Suspense fallback={<Spinner size={5} />}>
        {storyControls.map((Control) => (
          <Control key={Control.componentName} storyPreviewId={id} />
        ))}
      </Suspense>
    </ParameterContext.Provider>
  );
};
