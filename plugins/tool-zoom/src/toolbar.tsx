import React from "react";
import { IconButton, Toolbar, Tooltip } from "@fwoosh/components";
import { ZoomIn, ZoomOut, Maximize } from "react-feather";

export default function ZoomControl({
  storyPreviewId,
}: {
  storyPreviewId: string;
}) {
  const [zoom, zoomSet] = React.useState(100);
  const zoomInLabel = "Zoom in";
  const zoomOutLabel = "Zoom out";
  const zoomResetLabel = "Reset zoom";

  const increaseZoom = React.useCallback(() => {
    zoomSet((z) => z + z * 0.25);
  }, [zoom]);

  const decreaseZoom = React.useCallback(() => {
    zoomSet((z) => z - z * 0.25);
  }, [zoom]);

  const resetZoom = React.useCallback(() => {
    zoomSet(100);
  }, [zoom]);

  React.useEffect(() => {
    const storyPreview = document.getElementById(storyPreviewId);

    if (storyPreview) {
      // @ts-ignore
      storyPreview.style.zoom = `${zoom / 100}`;
    }
  }, [zoom]);

  return (
    <>
      <Tooltip message={zoomInLabel}>
        <Toolbar.Button asChild={true}>
          <IconButton onClick={increaseZoom}>
            <ZoomIn />
          </IconButton>
        </Toolbar.Button>
      </Tooltip>
      <Tooltip message={zoomOutLabel}>
        <Toolbar.Button asChild={true}>
          <IconButton onClick={decreaseZoom}>
            <ZoomOut />
          </IconButton>
        </Toolbar.Button>
      </Tooltip>
      <Tooltip message={zoomResetLabel}>
        <Toolbar.Button asChild={true}>
          <IconButton onClick={resetZoom}>
            <Maximize />
          </IconButton>
        </Toolbar.Button>
      </Tooltip>
    </>
  );
}
