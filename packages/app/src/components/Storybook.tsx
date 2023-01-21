import React from "react";
import {
  Content,
  SidebarItems,
  SidebarLayout,
  Sidebar,
  Spinner,
} from "@fwoosh/components";
import { styled } from "@fwoosh/styling";
import { Outlet } from "react-router-dom";
import { useId } from "@radix-ui/react-id";

import { StoryIdContext } from "./Story";
import { StorybookSidebarTree } from "./sidebar/StorybookSidebarTree";
import { CONTENT_ID } from "@fwoosh/utils";
import { StorybookToolbar } from "./StorybookToolbar";
import { useParameters } from "../hooks/useParameters";
import { ParameterContext } from "@fwoosh/hooks";

const StoryWrapper = styled("div", {
  position: "relative",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const Storybook = () => {
  const id = useId();
  const parameters = useParameters();

  return (
    <ParameterContext.Provider value={parameters}>
      <StoryIdContext.Provider value={id}>
        <StorybookToolbar />

        <SidebarLayout>
          <Sidebar>
            <SidebarItems>
              <React.Suspense fallback={<Spinner delay={2000} size={8} />}>
                <StorybookSidebarTree />
              </React.Suspense>
            </SidebarItems>
          </Sidebar>
          <Content id={CONTENT_ID}>
            <StoryWrapper>
              <Outlet />
            </StoryWrapper>
          </Content>
        </SidebarLayout>
      </StoryIdContext.Provider>
    </ParameterContext.Provider>
  );
};
