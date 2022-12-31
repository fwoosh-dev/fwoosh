import React from "react";
import { useParams } from "react-router-dom";
import { stories } from "@fwoosh/app/stories";
import { StyledMarkdown, styled } from "@fwoosh/components";

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
  },
});

export default function SourcePanel() {
  const params = useParams<{ storyId: string }>();
  const story = Object.values(stories).find((s) => s.slug === params.storyId);

  if (!story?.code) {
    return null;
  }

  return (
    <Panel>
      <StyledMarkdown>{story.code}</StyledMarkdown>
    </Panel>
  );
}
