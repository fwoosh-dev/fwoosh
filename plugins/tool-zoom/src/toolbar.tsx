import React from "react";
import { IconButton, Toolbar, Tooltip } from "@fwoosh/components";
import { ZoomIn, ZoomOut, Maximize } from "react-feather";
import { PanelPluginProps } from "fwoosh";

export function browserSupportsCssZoom(): boolean {
  try {
    return (
      // @ts-expect-error (we're testing for browser support)
      global.document.implementation.createHTMLDocument("").body.style.zoom !==
      undefined
    );
  } catch (error) {
    return false;
  }
}

const hasBrowserSupportForCssZoom = browserSupportsCssZoom();

export default function ZoomControl({ storyPreviewId }: PanelPluginProps) {
  const [zoom, zoomSet] = React.useState(100);
  const zoomInLabel = "Zoom in";
  const zoomOutLabel = "Zoom out";
  const zoomResetLabel = "Reset zoom";

  const increaseZoom = React.useCallback(() => {
    zoomSet((z) => z * 1.2);
  }, [zoom]);

  const decreaseZoom = React.useCallback(() => {
    zoomSet((z) => z * 0.8);
  }, [zoom]);

  const resetZoom = React.useCallback(() => {
    zoomSet(100);
  }, [zoom]);

  React.useEffect(() => {
    const storyPreview = document.getElementById(storyPreviewId);

    if (storyPreview) {
      if (hasBrowserSupportForCssZoom) {
        // @ts-ignore
        storyPreview.style.zoom = `${zoom / 100}`;
      } else {
        storyPreview.style.transformOrigin = "top left";

        if (zoom === 100) {
          storyPreview.style.transform = "none";
        } else {
          storyPreview.style.transform = `scale(${zoom / 100})`;
        }
      }
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
