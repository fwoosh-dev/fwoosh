import * as React from "react";
import { stories } from "@fwoosh/app/stories";
import { MDXContent } from "@fwoosh/components";
import { styled } from "@fwoosh/styling";
import { useHighlightedCode } from "@fwoosh/hooks";
import { BasicStoryData, PanelPluginProps } from "fwoosh";

const Panel = styled("div", {
  height: "100%",
  width: "100%",

  "& > span": {
    height: "100%",
  },

  "& pre": {
    margin: 0,
    border: "none",
    borderRadius: 0,
    height: "100%",
    overflow: "auto",
    text: "sm",
  },

  "& pre pre": {
    p: 4,
  },

  "& .ch-codeblock": {
    margin: 0,
    borderRadius: "0 !important",
    height: "100%",
    position: "sticky",
    top: 4,

    "& .ch-code": {
      borderRadius: "0 !important",
    },
  },

  "& .ch-code-scroll-content > *": {
    transform: "translateX(0px) translateY(20.367px) scale(1) !important",
  },
});

function HighlightedSource({ story }: { story: BasicStoryData }) {
  const highlightedCode = useHighlightedCode(story);
  return <MDXContent compiledSource={highlightedCode} />;
}

export default function SourcePanel({ storyId }: PanelPluginProps) {
  const story = Object.values(stories).find((s) => s?.slug === storyId);

  if (!story || !("code" in story)) {
    return null;
  }

  return (
    <Panel>
      <HighlightedSource story={story} />
    </Panel>
  );
}
