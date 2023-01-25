import { styled } from "@fwoosh/styling";
import { HTMLContainer, TLShapeUtil } from "@tldraw/core";
import * as React from "react";

import { GroupShape } from "./GroupShape";

const GroupWrapper = styled("div", {
  borderRadius: "$round",
  borderWidth: "$sm",
  borderStyle: "$solid",
  borderColor: "re",
  height: "100%",
  width: "100%",
});

export const GroupComponent = TLShapeUtil.Component<GroupShape, HTMLDivElement>(
  ({ shape, events }, ref) => {
    console.log("GROUP", shape);
    return (
      <HTMLContainer ref={ref} {...events}>
        <GroupWrapper>{shape.id}</GroupWrapper>
      </HTMLContainer>
    );
  }
);
