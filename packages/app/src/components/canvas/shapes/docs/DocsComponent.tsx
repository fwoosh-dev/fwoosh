import { flattenTree } from "@fwoosh/utils";
import { HTMLContainer, TLShapeUtil } from "@tldraw/core";
import * as React from "react";
import useMeasure from "react-use-measure";
import { tree } from "@fwoosh/app/stories";
import { styled } from "@fwoosh/styling";
import { IconButton, Spinner, Tooltip } from "@fwoosh/components";

import { DocsShape } from "./DocsShape";
import { machine } from "../../machine";
import { ExternalLink } from "react-feather";
import { Link } from "react-router-dom";
import { CanvasMeta } from "../../constants";
import { StoryData } from "@fwoosh/types";

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

const Story = React.memo(
  ({
    item,
    containerRef,
    hasBeenMeasured,
    storyId,
  }: {
    item: StoryData;
    hasBeenMeasured: boolean;
  } & CanvasMeta) => {
    const { component: Component, grouping, slug, title } = item;
    const groups = grouping.split("/");
    const [measureRef, bounds] = useMeasure();

    if (!hasBeenMeasured && bounds.height > 0) {
      machine.send("UPDATE_DIMENSIONS", {
        id: item.slug,
        width: bounds.width,
        height: bounds.height,
      });

      if (item.slug === storyId) {
        machine.send("CENTER_SHAPE", {
          id: item.slug,
          client: {
            height: containerRef.current?.clientHeight,
            width: containerRef.current?.clientWidth,
          },
        });
      }
    }

    return (
      <React.Suspense fallback={<Spinner delay={1000} />}>
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
            <Component />
          </StoryWrapper>
        </ItemWrapper>
      </React.Suspense>
    );
  }
);

const flatTree = flattenTree(tree);

export const DocsComponent = TLShapeUtil.Component<
  DocsShape,
  HTMLDivElement,
  CanvasMeta
>(({ shape, events, meta }, ref) => {
  const item = flatTree[shape.id];

  if (!item) {
    return (
      <HTMLContainer ref={ref} {...events}>
        {""}
      </HTMLContainer>
    );
  }

  return (
    <HTMLContainer ref={ref} {...events}>
      <Story item={item} {...meta} hasBeenMeasured={shape.hasBeenMeasured} />;
    </HTMLContainer>
  );
});
