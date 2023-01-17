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
  const [loaded, setLoaded] = React.useState(false);

  // Defer loading iframe URL.
  // Some sites (e.g. Figma) detects Fullscreen API capability on
  // initial load. This is quite common implementation. But in our usage,
  // it seems that React hold the created <iframe> element when update,
  // and it causes "outdated Fullscreen capability" problem.
  // This might be a browser bug that "`fullscreenEnabled` property does not
  // updated" but I'm not sure what the correct behavior (I couldn't see the
  // statement in the Fulscreen API spec).
  // This side-effect delays the loading of an iframe contents by one frame to
  // make sure the contents gets updated attributes.
  // https://github.com/pocka/storybook-addon-designs/issues/77
  React.useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setUrl(src);
    });

    return () => cancelAnimationFrame(handle);
  }, [src]);

  React.useEffect(() => {
    setLoaded(false);
  }, [url]);

  return <Iframe src={url} onLoad={() => setLoaded(true)} />;
}

const Empty = styled("div", {
  color: "$gray8",
  p: 4,
});

export default function DesignsPanel() {
  const params = useParameters() as DesignsPanelParameters;

  if (!params.designs) {
    return <Empty>No designs configured for this story.</Empty>;
  }

  return (
    <Preview
      src={`https://www.figma.com/embed?embed_host=astra&url=${params.designs}`}
    />
  );
}
