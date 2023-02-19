import * as React from "react";
import { styled } from "@fwoosh/styling";
import { panels } from "@fwoosh/app/ui";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { Story } from "./Story";
import { ToolPanels } from "./ToolPanels";
import { ErrorBoundary } from "@fwoosh/components";
import { useStoryId } from "@fwoosh/hooks";

const Scrollable = styled("div", {
  overflow: "auto",
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

  let content = <Story />;

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

  return <ErrorBoundary key={storyId}>{content}</ErrorBoundary>;
};
