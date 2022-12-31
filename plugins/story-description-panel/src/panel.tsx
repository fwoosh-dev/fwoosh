import React from "react";
import { useParams } from "react-router-dom";
import { stories } from "@fwoosh/app/stories";
import { StyledMarkdown, styled } from "@fwoosh/components";

const Panel = styled("div", {
  height: "100%",
  width: "100%",
  px: 4,

  "& > span": {
    height: "100%",
  },
  "& pre": {
    margin: 0,
    border: "none",
    borderRadius: 0,
    height: "100%",
  },
});

export default function DescriptionPanel() {
  const params = useParams<{ storyId: string }>();
  const story = Object.values(stories).find((s) => s.slug === params.storyId);

  if (!story?.comment) {
    return null;
  }

  return (
    <Panel>
      <StyledMarkdown>{story.comment}</StyledMarkdown>
    </Panel>
  );
}
