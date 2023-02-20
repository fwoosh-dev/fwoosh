import * as React from "react";
import { stories } from "@fwoosh/app/stories";
import { components, MDXContent } from "@fwoosh/components";
import { styled } from "@fwoosh/styling";
import { BasicStoryData, PanelPluginProps } from "fwoosh";
import { useMdxContent } from "@fwoosh/hooks";

const Panel = styled("div", {
  height: "100%",
  width: "100%",
  px: 4,
});

const NoDescriptionMessage = styled(components.p, {
  color: "$gray10",
});

function Content({ story }: { story: BasicStoryData }) {
  const content = useMdxContent(story.slug, story.comment!);

  if (!content) {
    return null;
  }

  return <MDXContent compiledSource={content} />;
}

export default function DescriptionPanel({ storyId }: PanelPluginProps) {
  const story = Object.values(stories).find((s) => s?.slug === storyId);

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
      <Content story={story} />
    </Panel>
  );
}
