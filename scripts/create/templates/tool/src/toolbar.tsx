import * as React from "react";
import { IconButton, Toolbar } from "@fwoosh/components";

export default function {{pascal}}({
  storyPreviewId,
}: {
  storyPreviewId: string;
}) {
  return (
    <Toolbar.Button asChild={true}>
      <IconButton></IconButton>
    </Toolbar.Button>
  );
}
