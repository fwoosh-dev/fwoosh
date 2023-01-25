import * as React from "react";

import {
  Renderer,
  TLKeyboardEventHandler,
  TLPinchEventHandler,
  TLWheelEventHandler,
} from "@tldraw/core";
import { machine } from "./machine.js";
import { shapeUtils } from "./shapes";
import { css, styled } from "@fwoosh/styling";
import { IconButton, Tooltip } from "@fwoosh/components";
import { Minus, Plus } from "react-feather";

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
  margin: "$3",
  pointerEvents: "auto",
  zIndex: 100,
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

const canvasStyles = css({
  background: "$gray0",
});

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

    // Prevent browser from navigating back/forward when
    // the user scrolls left/right on the timeline.
    React.useEffect(() => {
      const { current } = containerRef;

      if (!current) {
        return;
      }

      function cancelZoom(e: WheelEvent) {
        e.preventDefault();
      }

      // We need to use the `passive: false` option to prevent the default
      // behavior of the event. Without this the browser will still zoom
      // in/out on the page.
      document.addEventListener("wheel", cancelZoom, { passive: false });

      return () => {
        document.removeEventListener("wheel", cancelZoom);
      };
    }, []);

    React.useEffect(() => {
      const timeout = setTimeout(layout, 2000);
      return () => clearTimeout(timeout);
    }, []);

    return (
      <Wrapper>
        <Renderer
          containerRef={containerRef}
          theme={{ background: "transparent" }}
          page={appState.data.page}
          pageState={appState.data.pageState}
          shapeUtils={shapeUtils}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onPinch={onPinch}
          onPan={onPan}
        />

        <ViewControls>
          <Tooltip message="Zoom in">
            <IconButton onClick={zoomIn}>
              <Plus />
            </IconButton>
          </Tooltip>
          <Tooltip message="Zoom out">
            <IconButton onClick={zoomOut}>
              <Minus />
            </IconButton>
          </Tooltip>
        </ViewControls>
      </Wrapper>
    );
  }
);
