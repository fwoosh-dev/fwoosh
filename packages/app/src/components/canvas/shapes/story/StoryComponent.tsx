import { flattenTree } from "@fwoosh/utils";
import { HTMLContainer, TLShapeUtil } from "@tldraw/core";
import * as React from "react";
import { styled } from "@fwoosh/styling";
import { IconButton, Tooltip } from "@fwoosh/components";

import { StoryShape } from "./StoryShape";
import { ExternalLink } from "react-feather";
import { Link } from "react-router-dom";
import { CanvasMeta } from "../../constants";
import { StoryData } from "@fwoosh/types";
import { tree } from "@fwoosh/app/stories";
import { useId } from "@radix-ui/react-id";
import { useRender } from "../../../../hooks/useRender";
import { useShapeMeasure } from "../useShapeMeasure";

const ItemWrapper = styled("div", {
  borderRadius: "$round",
  borderWidth: "$sm",
  borderStyle: "$solid",
  borderColor: "$gray7",
  pointerEvents: "auto",
  width: "fit-content",
});

const StoryTitle = styled("div", {
  height: "$10",
  background: "$gray3",
  px: 4,
  py: 2,
  display: "flex",
  alignItems: "center",
  text: "sm",
  color: "$gray11",
  overflow: "hidden",
  borderTopRightRadius: "$round",
  borderTopLeftRadius: "$round",
});

const Split = styled("div", {
  flex: 1,
  width: "$10",
});

const Grouping = styled("div", {
  fontWeight: 300,
  mr: 3,
  color: "$gray9",
});

const StoryWrapper = styled("div", {
  p: 4,
  width: "max-content",
});

const Story = React.memo(function Story({
  item,
  storyId,
  shape,
}: {
  item: StoryData;
  shape: StoryShape;
} & CanvasMeta) {
  const { grouping, slug, title } = item;
  const groups = grouping.split("/");
  const id = useId();
  const { ref } = useRender({ id, slug: item.slug });
  const measureRef = useShapeMeasure(shape, id);

  return (
    <ItemWrapper
      ref={measureRef}
      css={{
        boxShadow:
          storyId === item.slug ? "0 0 0 4px $colors$gray8" : undefined,
      }}
    >
      <StoryTitle as={Link} to={`/canvas/workbench/${slug}`}>
        <Grouping>{groups[groups.length - 1]}</Grouping> {title}
        <Split />
        <Tooltip message="Open story">
          <IconButton as={Link} to={`/workbench/${slug}`}>
            <ExternalLink />
          </IconButton>
        </Tooltip>
      </StoryTitle>

      <StoryWrapper>
        <div id={id} ref={ref} />
      </StoryWrapper>
    </ItemWrapper>
  );
});

export const StoryComponent = TLShapeUtil.Component<
  StoryShape,
  HTMLDivElement,
  CanvasMeta
>(({ shape, events, meta }, ref) => {
  const item = flattenTree(tree)[shape.id];

  if (!item) {
    return (
      <HTMLContainer ref={ref} {...events}>
        {""}
      </HTMLContainer>
    );
  }

  return (
    <HTMLContainer ref={ref} {...events}>
      {shape.visibility !== "hidden" && (
        <Story item={item} {...meta} shape={shape} />
      )}
    </HTMLContainer>
  );
});
