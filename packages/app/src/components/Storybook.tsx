import React, { Suspense } from "react";
import {
  Content,
  SidebarItems,
  SidebarItem,
  SidebarLayout,
  SidebarSectionTitle,
  SidebarTitle,
  Sidebar,
  SidebarHeader,
  styled,
  Toolbar,
  Spinner,
  Tabs,
} from "@fwoosh/components";
import { toolbarControls, panels } from "@fwoosh/app/ui";
import { config } from "@fwoosh/app/config";
import { Outlet, Link, useParams } from "react-router-dom";
import { useId } from "@radix-ui/react-id";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { StoryTree, useStoryTree } from "../hooks/useStoryTree";
import { ThemeToggle } from "./ThemeToggle";
import ErrorBoundary from "./ErrorBoundary";
import { StoryIdContext } from "./Story";

const StoryToolbar = styled(Toolbar.Root, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  height: "$12",
  borderBottom: "1px solid $gray4",
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
});

const TabContent = styled(Tabs.Content, {
  display: "flex",
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

const TreeItem = ({ tree }: { tree: StoryTree }) => {
  const params = useParams<{ storyId: string }>();

  return (
    <>
      {Object.entries(tree).map(([title, items]) => {
        return (
          <React.Fragment key={title}>
            <SidebarSectionTitle>{title}</SidebarSectionTitle>
            {Array.isArray(items) ? (
              items.map((story) => (
                <Link key={story.slug} to={story.slug}>
                  <SidebarItem aria-selected={story.slug === params.storyId}>
                    {story.title}
                  </SidebarItem>
                </Link>
              ))
            ) : (
              <TreeItem tree={items} />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export const Storybook = () => {
  const tree = useStoryTree();
  const id = useId();
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
    <SidebarLayout>
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle>{config.title}</SidebarTitle>
          <ThemeToggle />
        </SidebarHeader>
        <SidebarItems>
          <TreeItem tree={tree} />
        </SidebarItems>
      </Sidebar>
      <Content>
        <StoryWrapper>
          {toolbarControls.length > 0 && (
            <StoryToolbar>
              <Suspense fallback={<Spinner />}>
                {toolbarControls.map((Control) => (
                  <Control key={Control.componentName} storyPreviewId={id} />
                ))}
              </Suspense>
            </StoryToolbar>
          )}

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
                      <Tabs.List>
                        <Suspense fallback={<Spinner />}>
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
                      </Tabs.List>

                      {panels.map((Panel) => (
                        <TabContent
                          key={`content-${Panel.componentName}`}
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
  );
};
