import * as React from "react";
import { useLocation } from "react-router-dom";
import { HeadProvider, Style } from "react-head";
import { getCssText } from "@fwoosh/styling";
import { useDocsPath, useStoryId } from "@fwoosh/hooks";

interface DocumentMeta {
  title: string;
}

export const Head = () => {
  const [meta, setMeta] = React.useState<DocumentMeta | null>(null);
  const location = useLocation();

  const getMeta = React.useCallback(() => {
    const meta = document.querySelector<HTMLScriptElement>("#html-metadata");

    if (meta) {
      setMeta(JSON.parse(meta.text).meta);
    }
  }, []);

  React.useEffect(getMeta, [location, getMeta]);

  // When the page initially loads in dev mode the meta tag is not yet in the
  // DOM. This is a hack to wait for it to be added.
  // TODO: during build make sure this doesn't happen
  React.useEffect(() => {
    const mutationObserver = new MutationObserver((entries) => {
      const target = entries[0].target as HTMLElement;

      if (target.querySelector("#html-metadata")) {
        getMeta();
      }
    });
    const main = document.querySelector<HTMLElement>("body");

    if (!main) {
      return;
    }

    mutationObserver.observe(main, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
    };
  }, [getMeta]);

  const [css, setCss] = React.useState("");
  const storyId = useStoryId();
  const docsPath = useDocsPath();

  React.useEffect(() => {
    setTimeout(() => {
      setCss(getCssText());
    }, 1000); // todo maybe wait for spinner to not be visible
  }, [storyId, docsPath]);

  return (
    <HeadProvider>
      <Style
        type="text/css"
        id="stitches"
        data-rh=""
        dangerouslySetInnerHTML={{ __html: css }}
      />
      {meta &&
        Object.entries(meta).map(([name, value]) => {
          if (name === "title") {
            return <title key={name}>{value}</title>;
          }
        })}
    </HeadProvider>
  );
};
