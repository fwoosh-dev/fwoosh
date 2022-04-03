import React from "react";
import { IconButton, Toolbar } from "@fwoosh/components";
import { DivideSquare, XSquare } from "react-feather";
import { useParams } from "react-router-dom";

import { findAndDrawElement } from "./box-model/visualizer";
import { destroy, init, rescale, clear } from "./box-model/canvas";

export default function MeasureControl({
  storyPreviewId,
}: {
  storyPreviewId: string;
}) {
  const [on, onSet] = React.useState(false);
  const params = useParams<{ storyId: string }>();
  const label = on ? "Turn off measure" : "Turn on measure";

  const onToggle = React.useCallback(() => {
    onSet((o) => !o);
  }, []);

  React.useEffect(clear, [params.storyId]);

  React.useEffect(() => {
    const onMouseOver = (event: MouseEvent) => {
      window.requestAnimationFrame(() => {
        event.stopPropagation();
        findAndDrawElement(event.clientX, event.clientY);
      });
    };

    const onResize = () => window.requestAnimationFrame(rescale);

    if (on) {
      const story = document.getElementById(storyPreviewId);

      if (!story) {
        return;
      }

      story.addEventListener("mouseover", onMouseOver);
      init();
      window.addEventListener("resize", onResize);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      destroy();
    };
  }, [on]);

  return (
    <IconButton onClick={onToggle} aria-label={label} title={label}>
      {on ? <XSquare /> : <DivideSquare />}
    </IconButton>
  );
}
