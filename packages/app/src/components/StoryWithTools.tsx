import React from "react";
import { styled } from "@fwoosh/styling";
import { panels } from "@fwoosh/app/ui";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { Story } from "./Story";
import { ToolPanels } from "./ToolPanels";
import { ErrorBoundary } from "@fwoosh/components";
import { useStoryId } from "@fwoosh/hooks";

const StyledPanel = styled(Panel, {
  overflow: "auto !important",
});

const PanelContainer = styled("div", {
  height: "100%",
  borderTopWidth: "$sm",
  borderTopStyle: "$solid",
  borderTopColor: "$gray4",
  backgroundColor: "$gray0",
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

export const StoryWithTools = () => {
  const storyId = useStoryId();
  const storyPaneSize = React.useMemo(() => {
    if (localStorage.getItem("fwoosh:storyPaneSize")) {
      return Number(localStorage.getItem("fwoosh:storyPaneSize"));
    }

    return 75;
  }, []);
  const storyPaneSizeSet = React.useCallback((size: number) => {
    localStorage.setItem("fwoosh:storyPaneSize", String(size));
  }, []);

  let content = <Story />;

  if (panels.length > 0 && storyId) {
    content = (
      <PanelGroup direction="vertical">
        <StyledPanel
          maxSize={75}
          defaultSize={storyPaneSize}
          onResize={storyPaneSizeSet}
        >
          {content}
        </StyledPanel>
        <PanelResizeHandle>
          <PanelResizer />
        </PanelResizeHandle>
        <Panel maxSize={75}>
          <PanelContainer>
            <ToolPanels storySlug={storyId} />
          </PanelContainer>
        </Panel>
      </PanelGroup>
    );
  }

  return <ErrorBoundary key={storyId}>{content}</ErrorBoundary>;
};
