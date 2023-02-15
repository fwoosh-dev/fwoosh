import * as React from "react";

import {
  Renderer,
  TLKeyboardEventHandler,
  TLPinchEventHandler,
  TLWheelEventHandler,
} from "@tldraw/core";
import { machine } from "./machine.js";
import { shapeUtils } from "./shapes/index.js";
import { styled } from "@fwoosh/styling";
import { components, IconButton, Spinner, Tooltip } from "@fwoosh/components";
import { Minus, Plus, RotateCw } from "react-feather";
import { useDidChange, useStoryId } from "@fwoosh/hooks";
import { MDXProvider } from "@mdx-js/react";

const Loading = styled("div", {
  position: "absolute",
  height: "100%",
  width: "100%",
  background: "$gray0",
  zIndex: 1000000,
  inset: 0,
});

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

const onPinch: TLPinchEventHandler = (info) => {
  machine.send("PINCHED", info);
};

const onPan: TLWheelEventHandler = (info) => {
  machine.send("PANNED", info);
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

const onKeyUp: TLKeyboardEventHandler = (key, info) => {
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

type MDXComponents = React.ComponentProps<typeof MDXProvider>["components"];

export const Canvas = React.memo(function Canvas({
  appState,
  mode,
}: {
  appState: typeof machine;
  mode: "docs" | "workbench";
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const storyId = useStoryId();
  const toMeasure = Object.values(appState.data.page.shapes).length;
  const hasMeasured = Object.values(appState.data.page.shapes).filter(
    (s) => s.size[0] > 0
  );
  const doneMeasuring = hasMeasured.length === toMeasure;

  if (doneMeasuring) {
    // This log is used to communicate the search index to the
    // built app.
    console.log("window.FWOOSH_CANVAS_SHAPE", appState.data.page.shapes);
  }

  React.useEffect(() => {
    if (!window.FWOOSH_WORKBENCH_CANVAS_SHAPES) {
      requestAnimationFrame(() => {
        machine.send("START_MEASURE");
      });
    }
  }, []);

  if (useDidChange(doneMeasuring) && doneMeasuring) {
    machine.send("CENTER_SHAPE", {
      id: storyId,
      client: {
        height: containerRef.current?.clientHeight,
        width: containerRef.current?.clientWidth,
      },
    });
  }

  return (
    <MDXProvider components={components as MDXComponents}>
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
          meta={{ storyId, containerRef, mode }}
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
        {!doneMeasuring && (
          <Loading>
            <Spinner delay={500} size={8}>
              Measuring shapes ({hasMeasured.length + 1} / {toMeasure})
            </Spinner>
          </Loading>
        )}
      </Wrapper>
    </MDXProvider>
  );
});
