import React from "react";
import { useParams } from "react-router-dom";
import { useDocs } from "@fwoosh/app/docs";
import { stories } from "@fwoosh/app/stories";
import { PropsTable } from "@fwoosh/components";

export default function PropsPanel() {
  const params = useParams<{ storyId: string }>();
  const [, story] =
    Object.entries(stories).find(([slug]) => slug === params.storyId) || [];

  console.log(story?.component?._payload?._result.component);
  const docs = useDocs(story?.component?._payload?._result || story?.meta);

  return <PropsTable docs={docs} />;
}
