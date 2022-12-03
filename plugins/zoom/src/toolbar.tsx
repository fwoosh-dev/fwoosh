import React from "react";
import { IconButton, Toolbar } from "@fwoosh/components";
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
      <Toolbar.Button asChild={true}>
        <IconButton
          onClick={increaseZoom}
          aria-label={zoomInLabel}
          title={zoomInLabel}
        >
          <ZoomIn />
        </IconButton>
      </Toolbar.Button>
      <Toolbar.Button asChild={true}>
        <IconButton
          onClick={decreaseZoom}
          aria-label={zoomOutLabel}
          title={zoomOutLabel}
        >
          <ZoomOut />
        </IconButton>
      </Toolbar.Button>
      <Toolbar.Button asChild={true}>
        <IconButton
          onClick={resetZoom}
          aria-label={zoomResetLabel}
          title={zoomResetLabel}
        >
          <Maximize />
        </IconButton>
      </Toolbar.Button>
    </>
  );
}
