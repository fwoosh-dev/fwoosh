import React from "react";
import { useParams } from "react-router-dom";
import { useDocs } from "@fwoosh/app/docs";
import { stories } from "@fwoosh/app/stories";
import { PropsTable, styled } from "@fwoosh/components";

const Wrapper = styled("div", {
  px: 4,
  width: "100%",
});

export default function PropsPanel() {
  const params = useParams<{ storyId: string }>();
  const [, story] =
    Object.entries(stories).find(([slug]) => slug === params.storyId) || [];
  const key = story?.slug || "none";
  const docs = useDocs(key, story?.component?._payload?._result, story?.meta);

  return (
    <Wrapper>
      <PropsTable key={key} docs={docs} />
    </Wrapper>
  );
}
