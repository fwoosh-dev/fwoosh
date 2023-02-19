import * as React from "react";
import { useParameters } from "@fwoosh/hooks";

import { DesignsPanelParameters } from "./types";
import { styled } from "@fwoosh/styling";

const Iframe = styled("iframe", {
  width: "100%",
  height: "100%",
});

function Preview({ src }: { src: string }) {
  const [url, setUrl] = React.useState<string | undefined>(undefined);

  // Defer loading iframe URL.
  // Some sites (e.g. Figma) detects Fullscreen API capability on
  // initial load. This is quite common implementation. But in our usage,
  // it seems that React hold the created <iframe> element when update,
  // and it causes "outdated Fullscreen capability" problem.
  // This might be a browser bug that "`fullscreenEnabled` property does not
  // updated" but I'm not sure what the correct behavior (I couldn't see the
  // statement in the Fullscreen API spec).
  // This side-effect delays the loading of an iframe contents by one frame to
  // make sure the contents gets updated attributes.
  React.useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setUrl(src);
    });

    return () => cancelAnimationFrame(handle);
  }, [src]);

  return <Iframe src={url} />;
}

const Empty = styled("div", {
  color: "$gray8",
  p: 4,
});

export default function DesignsPanel() {
  const params = useParameters() as { designs: DesignsPanelParameters };
  const url =
    typeof params?.designs === "string"
      ? params?.designs
      : params?.designs.spec;

  if (!params?.designs) {
    return <Empty>No designs configured for this story.</Empty>;
  }

  return (
    <Preview src={`https://www.figma.com/embed?embed_host=astra&url=${url}`} />
  );
}
