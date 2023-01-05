import React, { Suspense } from "react";
import {
  Content,
  SidebarItems,
  SidebarLayout,
  Sidebar,
  styled,
  Toolbar,
  Spinner,
  Tabs,
  HeaderBar,
  HeaderTitle,
  ErrorBoundary,
} from "@fwoosh/components";
import { toolbarControls, panels } from "@fwoosh/app/ui";
import { Outlet, useParams } from "react-router-dom";
import { useId } from "@radix-ui/react-id";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { StoryIdContext } from "./Story";
import { StorybookSidebarTree } from "./sidebar/StorybookSidebarTree";
import { ThemeToggle } from "./ThemeToggle";
import { config } from "@fwoosh/app/config";
import { CONTENT_ID } from "../constants";

const StoryToolbar = styled(Toolbar.Root, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
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

const PanelContainer = styled("div", {
  height: "100%",
  borderTop: "1px solid $gray4",
  backgroundColor: "$gray0",
});

const TabsList = styled(Tabs.List, {
  height: "$12",
});

const TabContent = styled(Tabs.Content, {
  display: "flex",
  text: "sm",
});

const PanelResizer = styled("div", {
  width: "100%",
  borderTop: "1px solid transparent",
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

export const Storybook = () => {
  const id = useId();
  const params = useParams<{ storyId: string }>();
  const story = (
    <StoryIdContext.Provider value={id}>
      <Outlet />
    </StoryIdContext.Provider>
  );

  const storyPaneSize = React.useMemo(() => {
    if (localStorage.getItem("fwoosh:storyPaneSize")) {
      return Number(localStorage.getItem("fwoosh:storyPaneSize"));
    }

    return 75;
  }, []);
  const storyPaneSizeSet = React.useCallback((size: number) => {
    localStorage.setItem("fwoosh:storyPaneSize", String(size));
  }, []);

  return (
    <>
      <HeaderBar>
        <HeaderTitle>{config.title}</HeaderTitle>
        {toolbarControls.length > 0 && (
          <StoryToolbar>
            <Suspense fallback={<Spinner size={5} />}>
              {toolbarControls.map((Control) => (
                <Control key={Control.componentName} storyPreviewId={id} />
              ))}
            </Suspense>
          </StoryToolbar>
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
            {panels.length > 0 ? (
              <>
                <PanelGroup direction="vertical">
                  <Panel
                    maxSize={75}
                    defaultSize={storyPaneSize}
                    onResize={storyPaneSizeSet}
                  >
                    {story}
                  </Panel>
                  <PanelResizeHandle>
                    <PanelResizer />
                  </PanelResizeHandle>
                  <Panel maxSize={75}>
                    <PanelContainer>
                      <Tabs.Root defaultValue={panels[0]?.componentName}>
                        <TabsList>
                          <Suspense
                            fallback={<Spinner delay={3000} size={5} />}
                          >
                            {panels.map((Panel) => {
                              return (
                                <Tabs.Trigger
                                  key={`trigger-${Panel.componentName}`}
                                  value={Panel.componentName}
                                >
                                  <Panel.displayName />
                                </Tabs.Trigger>
                              );
                            })}
                          </Suspense>
                        </TabsList>

                        {panels.map((Panel) => (
                          <TabContent
                            key={`content-${Panel.componentName}-${params.storyId}`}
                            value={Panel.componentName}
                          >
                            <ErrorBoundary>
                              <Suspense fallback={<Spinner />}>
                                <Panel storyPreviewId={id} />
                              </Suspense>
                            </ErrorBoundary>
                          </TabContent>
                        ))}
                      </Tabs.Root>
                    </PanelContainer>
                  </Panel>
                </PanelGroup>
              </>
            ) : (
              story
            )}
          </StoryWrapper>
        </Content>
      </SidebarLayout>
    </>
  );
};
