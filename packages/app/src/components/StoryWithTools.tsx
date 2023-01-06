import React, { Suspense } from "react";
import {
  Content,
  SidebarItems,
  SidebarLayout,
  Sidebar,
  styled,
  Toolbar,
  Spinner,
  HeaderBar,
  HeaderTitle,
} from "@fwoosh/components";
import { toolbarControls, panels } from "@fwoosh/app/ui";
import { Outlet } from "react-router-dom";
import { useId } from "@radix-ui/react-id";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { Story, StoryIdContext } from "./Story";
import { StorybookSidebarTree } from "./sidebar/StorybookSidebarTree";
import { ThemeToggle } from "./ThemeToggle";
import { config } from "@fwoosh/app/config";
import { CONTENT_ID } from "../constants";
import { ToolPanels } from "./ToolPanels";

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

export const StoryWithTools = () => {
  const storyPaneSize = React.useMemo(() => {
    if (localStorage.getItem("fwoosh:storyPaneSize")) {
      return Number(localStorage.getItem("fwoosh:storyPaneSize"));
    }

    return 75;
  }, []);
  const storyPaneSizeSet = React.useCallback((size: number) => {
    localStorage.setItem("fwoosh:storyPaneSize", String(size));
  }, []);

  if (panels.length > 0) {
    return (
      <PanelGroup direction="vertical">
        <Panel
          maxSize={75}
          defaultSize={storyPaneSize}
          onResize={storyPaneSizeSet}
        >
          <Story />
        </Panel>
        <PanelResizeHandle>
          <PanelResizer />
        </PanelResizeHandle>
        <Panel maxSize={75}>
          <PanelContainer>
            <ToolPanels />
          </PanelContainer>
        </Panel>
      </PanelGroup>
    );
  }

  return <Story />;
};
