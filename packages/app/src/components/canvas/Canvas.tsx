import * as React from "react";

import {
  Renderer,
  TLKeyboardEventHandler,
  TLPinchEventHandler,
  TLWheelEventHandler,
} from "@tldraw/core";
import { machine } from "./machine.js";
import { shapeUtils } from "./shapes";
import { styled } from "@fwoosh/styling";
import { IconButton, Tooltip } from "@fwoosh/components";
import { Minus, Plus, RotateCw } from "react-feather";
import { useStoryId } from "@fwoosh/hooks";

const Wrapper = styled("div", {
  position: "relative",
  height: "100%",
  width: "100%",
});

const ViewControls = styled("div", {
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "$2",
  margin: "$3 $2",
  pointerEvents: "auto",
  zIndex: 100,
  background: "$gray0",
  padding: "$2",
});

const onPinch: TLPinchEventHandler = (info, e) => {
  machine.send("PINCHED", info);
};

const onPan: TLWheelEventHandler = (info, e) => {
  machine.send("PANNED", info);
};

const layout = () => {
  machine.send("LAYOUT_BOXES");
};

const zoomIn = () => {
  machine.send("ZOOMED_IN");
};

const zoomOut = () => {
  machine.send("ZOOMED_OUT");
};

const zoomReset = () => {
  machine.send("ZOOMED_RESET");
};

const onKeyDown: TLKeyboardEventHandler = (key, info, e) => {
  switch (key) {
    case "Alt":
    case "Meta":
    case "Control":
    case "Shift": {
      machine.send("TOGGLED_MODIFIER", info);
      break;
    }
    case "=": {
      if (info.metaKey || info.ctrlKey) {
        e.preventDefault();
        machine.send("ZOOMED_IN", info);
      }
      break;
    }
    case "-": {
      if (info.metaKey || info.ctrlKey) {
        e.preventDefault();
        machine.send("ZOOMED_OUT", info);
      }
      break;
    }
  }
};

const onKeyUp: TLKeyboardEventHandler = (key, info, e) => {
  switch (key) {
    case "Alt":
    case "Meta":
    case "Control":
    case "Shift": {
      machine.send("TOGGLED_MODIFIER", info);
      break;
    }
  }
};

export const Canvas = React.memo(
  ({ appState }: { appState: typeof machine }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const storyId = useStoryId();

    React.useEffect(() => {
      const timeout = setTimeout(layout, 5000);
      return () => clearTimeout(timeout);
    }, []);

    return (
      <Wrapper ref={containerRef}>
        <Renderer
          theme={{ background: "transparent" }}
          page={appState.data.page}
          pageState={appState.data.pageState}
          shapeUtils={shapeUtils}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onPinch={onPinch}
          onPan={onPan}
          meta={{ storyId, containerRef }}
        />

        <ViewControls>
          <Tooltip side="left" message="Zoom in">
            <IconButton onClick={zoomIn}>
              <Plus />
            </IconButton>
          </Tooltip>
          <Tooltip side="left" message="Zoom out">
            <IconButton onClick={zoomOut}>
              <Minus />
            </IconButton>
          </Tooltip>
          <Tooltip side="left" message="Reset zoom">
            <IconButton onClick={zoomReset}>
              <RotateCw />
            </IconButton>
          </Tooltip>
        </ViewControls>
      </Wrapper>
    );
  }
);
