import React from "react";
import { useParams } from "react-router-dom";
import { stories } from "@fwoosh/app/stories";
import { StyledMarkdown, styled, components } from "@fwoosh/components";

const Panel = styled("div", {
  height: "100%",
  width: "100%",
  px: 4,
});

const NoDescriptionMessage = styled(components.p, {
  color: "$gray10",
});

export default function DescriptionPanel() {
  const params = useParams<{ storyId: string }>();
  const story = Object.values(stories).find((s) => s.slug === params.storyId);

  if (!story || !("comment" in story) || !story.comment) {
    return (
      <Panel>
        <NoDescriptionMessage>
          No description found for story
        </NoDescriptionMessage>
      </Panel>
    );
  }

  return (
    <Panel>
      <StyledMarkdown>{story.comment}</StyledMarkdown>
    </Panel>
  );
}
