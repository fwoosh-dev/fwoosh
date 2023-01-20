import React, { Suspense } from "react";
import { HeaderBar, HeaderTitle, Spinner } from "@fwoosh/components";
import { styled } from "@fwoosh/styling";
import { config } from "@fwoosh/app/config";
import { CONTENT_ID } from "@fwoosh/utils";

import { ThemeToggle } from "./ThemeToggle";
import { useToolbarControls } from "../hooks/useToolbarControls";
import { GlobalToolbar } from "./toolbar";

const Split = styled("div", {
  flex: 1,
});

export const DocsToolbar = () => {
  const { globalControls } = useToolbarControls();

  return (
    <HeaderBar>
      <HeaderTitle>{config.title}</HeaderTitle>
      <GlobalToolbar />

      <Split />
      <GlobalToolbar>
        <Suspense fallback={<Spinner size={5} />}>
          {globalControls.map((Control) => (
            <Control key={Control.componentName} storyPreviewId={CONTENT_ID} />
          ))}
        </Suspense>
        <ThemeToggle />
      </GlobalToolbar>
    </HeaderBar>
  );
};
