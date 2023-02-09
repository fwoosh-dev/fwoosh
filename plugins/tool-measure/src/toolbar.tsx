import React from "react";
import { IconButton, Tooltip, Toolbar } from "@fwoosh/components";
import { DivideSquare, XSquare } from "react-feather";

import { findAndDrawElement } from "./box-model/visualizer";
import { destroy, init, rescale, clear } from "./box-model/canvas";
import { PanelPluginProps } from "fwoosh";

export default function MeasureControl({
  storyPreviewId,
  storyId,
}: PanelPluginProps) {
  const [on, onSet] = React.useState(false);
  const label = on ? "Turn off measure" : "Turn on measure";

  const onToggle = React.useCallback(() => {
    onSet((o) => !o);
  }, []);

  React.useEffect(clear, [storyId]);

  React.useEffect(() => {
    const onMouseOver = (event: MouseEvent) => {
      window.requestAnimationFrame(() => {
        event.stopPropagation();
        findAndDrawElement(event.clientX, event.clientY, storyPreviewId);
      });
    };

    const onResize = () =>
      window.requestAnimationFrame(() => {
        rescale(storyPreviewId);
      });

    if (on) {
      const story = document.getElementById(storyPreviewId);

      if (!story) {
        return;
      }

      story.addEventListener("mouseover", onMouseOver);
      init(storyPreviewId);
      window.addEventListener("resize", onResize);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      destroy();
    };
  }, [on, storyPreviewId]);

  return (
    <Tooltip message={label}>
      <Toolbar.Button asChild={true}>
        <IconButton onClick={onToggle}>
          {on ? <XSquare /> : <DivideSquare />}
        </IconButton>
      </Toolbar.Button>
    </Tooltip>
  );
}
