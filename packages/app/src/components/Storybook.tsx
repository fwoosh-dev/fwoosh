import React, { Suspense } from "react";
import {
  Content,
  SidebarItems,
  SidebarLayout,
  Sidebar,
  Toolbar,
  Spinner,
  HeaderBar,
  HeaderTitle,
} from "@fwoosh/components";
import { styled } from "@fwoosh/styling";
import { toolbarControls } from "@fwoosh/app/ui";
import { Outlet } from "react-router-dom";
import { useId } from "@radix-ui/react-id";

import { StoryIdContext } from "./Story";
import { StorybookSidebarTree } from "./sidebar/StorybookSidebarTree";
import { ThemeToggle } from "./ThemeToggle";
import { config } from "@fwoosh/app/config";
import { CONTENT_ID } from "@fwoosh/utils";
import { useStoryId } from "@fwoosh/hooks";

const StoryToolbar = styled(Toolbar.Root, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "$1",
  flex: 1,
  height: "$12",
  flexShrink: 0,
});

const StoryWrapper = styled("div", {
  position: "relative",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const Split = styled("div", {
  flex: 1,
});

export const Storybook = () => {
  const storyId = useStoryId();
  const id = useId();

  return (
    <StoryIdContext.Provider value={id}>
      <HeaderBar>
        <HeaderTitle>{config.title}</HeaderTitle>
        {toolbarControls.length > 0 && storyId ? (
          <StoryToolbar>
            <Suspense fallback={<Spinner size={5} />}>
              {toolbarControls.map((Control) => (
                <Control key={Control.componentName} storyPreviewId={id} />
              ))}
            </Suspense>
          </StoryToolbar>
        ) : (
          <Split />
        )}
        <ThemeToggle />
      </HeaderBar>

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
  );
};
