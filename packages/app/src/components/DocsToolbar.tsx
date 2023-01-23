import React, { Suspense } from "react";
import { HeaderBar, HeaderTitle, Spinner } from "@fwoosh/components";
import { styled } from "@fwoosh/styling";
import { config } from "@fwoosh/app/config";

import { GlobalToolbarControls } from "./toolbar";
import { GlobalToolbarItems } from "./toolbar/GlobalToolbarItems";

const Split = styled("div", {
  flex: 1,
});

export const DocsToolbar = () => {
  return (
    <HeaderBar>
      <HeaderTitle>{config.title}</HeaderTitle>
      <GlobalToolbarControls />
      <Split />
      <GlobalToolbarControls>
        <Suspense fallback={<Spinner size={5} />}>
          <GlobalToolbarItems />
        </Suspense>
      </GlobalToolbarControls>
    </HeaderBar>
  );
};
