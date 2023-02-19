import * as React from "react";
import {
  Content,
  SidebarItems,
  SidebarLayout,
  Sidebar,
  Spinner,
  HeaderBar,
  HeaderTitle,
  ErrorBoundary,
} from "@fwoosh/components";
import { styled } from "@fwoosh/styling";
import { Outlet } from "react-router-dom";
import { useId } from "@radix-ui/react-id";
import { ParameterContext, useStoryId } from "@fwoosh/hooks";
import { config } from "@fwoosh/app/config";
import { CONTENT_ID } from "@fwoosh/utils";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { panels } from "@fwoosh/app/ui";

import { StoryIdContext } from "./Story";
import { WorkbenchSidebarTree } from "./sidebar/WorkbenchSidebarTree";
import { useParameters } from "../hooks/useParameters";
import { WorkbenchToolbar } from "./WorkbenchToolbar";
import { ToolPanels } from "./ToolPanels";

const StoryWrapper = styled("div", {
  position: "relative",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const Scrollable = styled("div", {
  overflow: "auto",
});

const PanelResizer = styled("div", {
  width: "100%",
  borderTopWidth: "$sm",
  borderTopStyle: "$solid",
  borderTopColor: "transparent",
  zIndex: 100,
  position: "relative",

  "&:after": {
    height: 12,
    position: "absolute",
    transform: "translateY(-50%)",
    left: 0,
    right: 0,
    top: "50%",
    content: "''",
  },

  "&:hover": {
    borderColor: "$gray10",
  },
});

const PanelContainer = styled("div", {
  height: "100%",
  borderTopWidth: "$sm",
  borderTopStyle: "$solid",
  borderTopColor: "$gray4",
  backgroundColor: "$gray0",
});

const StoryWrapperWithParams = () => {
  const parameters = useParameters();
  const storyId = useStoryId();

  let content = (
    <ErrorBoundary key={storyId}>
      <Outlet />
    </ErrorBoundary>
  );

  if (panels.length > 0 && storyId) {
    content = (
      <PanelGroup autoSaveId="fwoosh-tools" direction="vertical">
        <Panel>
          <Scrollable>{content}</Scrollable>
        </Panel>
        <PanelResizeHandle>
          <PanelResizer />
        </PanelResizeHandle>
        <Panel collapsible maxSize={75}>
          <PanelContainer>
            <ToolPanels storySlug={storyId} />
          </PanelContainer>
        </Panel>
      </PanelGroup>
    );
  }

  return (
    <ParameterContext.Provider value={parameters}>
      <Content id={CONTENT_ID}>
        <StoryWrapper>{content}</StoryWrapper>
      </Content>
    </ParameterContext.Provider>
  );
};

export const Workbench = () => {
  const id = useId();

  return (
    <StoryIdContext.Provider value={id}>
      <HeaderBar>
        <HeaderTitle>{config.title}</HeaderTitle>
        <React.Suspense fallback={<Spinner delay={2000} size={5} />}>
          <WorkbenchToolbar />
        </React.Suspense>
      </HeaderBar>

      <SidebarLayout>
        <Sidebar>
          <SidebarItems>
            <React.Suspense fallback={<Spinner delay={2000} size={8} />}>
              <WorkbenchSidebarTree />
            </React.Suspense>
          </SidebarItems>
        </Sidebar>
        <React.Suspense fallback={<Spinner delay={2000} size={8} />}>
          <StoryWrapperWithParams />
        </React.Suspense>
      </SidebarLayout>
    </StoryIdContext.Provider>
  );
};
