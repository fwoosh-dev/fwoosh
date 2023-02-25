import * as React from "react";
import { useId } from "@radix-ui/react-id";

import { styled } from "@fwoosh/styling";
import { stories } from "@fwoosh/app/stories";
import { useStoryId } from "@fwoosh/hooks";

import { useRender } from "../hooks/useRender";
import { Title } from "react-head";

export const StoryIdContext = React.createContext("");

const Root = styled("div", {
  position: "relative",
  flex: 1,
  overflow: "auto",
  height: "100%",
  width: "100%",
});

const StoryDiv = React.memo(function StoryDiv({
  slug,
  id,
}: {
  slug: string;
  id: string;
}) {
  const { ref } = useRender({ id, slug });
  const story = stories[slug];

  if (!story) {
    throw new Error(`Story not found: ${slug}`);
  }

  return (
    <>
      <Title>{story.title}</Title>
      <Root ref={ref} />
    </>
  );
});

export const Story = () => {
  const storyId = useStoryId();
  const contextId = React.useContext(StoryIdContext);
  const id = useId();

  return (
    <>
      {storyId ? (
        <StoryDiv slug={storyId} id={contextId || id} />
      ) : (
        <div>Story not found</div>
      )}
    </>
  );
};
