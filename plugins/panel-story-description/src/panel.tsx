import React from "react";
import { stories } from "@fwoosh/app/stories";
import { components, MDXContent } from "@fwoosh/components";
import { styled } from "@fwoosh/styling";
import { useStoryId } from "@fwoosh/hooks";

const Panel = styled("div", {
  height: "100%",
  width: "100%",
  px: 4,
});

const NoDescriptionMessage = styled(components.p, {
  color: "$gray10",
});

export default function DescriptionPanel() {
  const storyId = useStoryId();
  const story = Object.values(stories).find((s) => s.slug === storyId);

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
      <MDXContent compiledSource={story.comment} />
    </Panel>
  );
}
