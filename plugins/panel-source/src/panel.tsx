import React from "react";
import { stories } from "@fwoosh/app/stories";
import { StyledMarkdown } from "@fwoosh/components";
import { styled } from "@fwoosh/styling";
import { useHighlightedCode, useStoryId } from "@fwoosh/hooks";

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
});

function HighlightedSource({ code }: { code: string }) {
  const highlightedCode = useHighlightedCode({ code });
  return <StyledMarkdown>{highlightedCode}</StyledMarkdown>;
}

export default function SourcePanel() {
  const storyId = useStoryId();
  const story = Object.values(stories).find((s) => s.slug === storyId);

  if (!story || !("code" in story) || !story.code) {
    return null;
  }

  return (
    <Panel>
      <HighlightedSource code={story.code} />
    </Panel>
  );
}
