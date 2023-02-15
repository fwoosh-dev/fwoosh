import * as React from "react";
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
  }, []);

  const decreaseZoom = React.useCallback(() => {
    zoomSet((z) => z * 0.8);
  }, []);

  const resetZoom = React.useCallback(() => {
    zoomSet(100);
  }, []);

  React.useEffect(() => {
    const storyPreview = document.getElementById(storyPreviewId);

    if (storyPreview) {
      if (hasBrowserSupportForCssZoom) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (storyPreview.style as any).zoom = `${zoom / 100}`;
      } else {
        storyPreview.style.transformOrigin = "top left";

        if (zoom === 100) {
          storyPreview.style.transform = "none";
        } else {
          storyPreview.style.transform = `scale(${zoom / 100})`;
        }
      }
    }
  }, [storyPreviewId, zoom]);

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
