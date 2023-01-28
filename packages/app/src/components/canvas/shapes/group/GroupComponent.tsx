import { tree } from "@fwoosh/app/stories";
import { IconButton, Spinner, Tooltip } from "@fwoosh/components";
import { styled } from "@fwoosh/styling";
import { StoryData } from "@fwoosh/types/src";
import { flattenTree } from "@fwoosh/utils";
import { components } from "@fwoosh/components";
import { HTMLContainer, TLShapeUtil } from "@tldraw/core";
import * as React from "react";
import { ExternalLink } from "react-feather";
import { Link } from "react-router-dom";
import useMeasure from "react-use-measure";
import { CanvasMeta } from "../../constants";
import { machine } from "../../machine";

import { GroupShape } from "./GroupShape";

const GroupWrapper = styled("div", {
  borderRadius: "$round",
  borderWidth: "$sm",
  borderStyle: "$solid",
  borderColor: "$gray7",
  pointerEvents: "auto",
  width: "max-content",
  padding: "$2",
});

const ItemWrapper = styled("div", {
  borderRadius: "$round",
  borderWidth: "$sm",
  borderStyle: "$solid",
  borderColor: "$gray7",
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

const Story = ({
  item,
  storyId,
}: {
  item: StoryData;
} & Pick<CanvasMeta, "storyId">) => {
  const { component: Component, grouping, slug, title } = item;
  const groups = grouping.split("/");

  return (
    <React.Suspense fallback={<Spinner delay={1000} />}>
      <ItemWrapper
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
          {/* todo need to use story component that render stories elsewhere */}
          <Component />
        </StoryWrapper>
      </ItemWrapper>
    </React.Suspense>
  );
};

const StoryGroup = React.memo(function StoryGroup({
  shape,
  ...props
}: { shape: GroupShape; hasBeenMeasured: boolean } & CanvasMeta) {
  const [measureRef, bounds] = useMeasure();

  React.useEffect(() => {
    if (bounds.height > 0) {
      machine.send("UPDATE_DIMENSIONS", {
        id: shape.id,
        width: bounds.width,
        height: bounds.height,
      });
    }
  }, [bounds.height, bounds.width, shape.id]);

  return (
    <GroupWrapper ref={measureRef}>
      {shape.name && (
        <components.h3 css={{ marginTop: "$2", padding: "0 $1" }}>
          {shape.name}
        </components.h3>
      )}

      {shape.stories.map((story) => (
        <div
          style={{
            height: 100,
            width: 100,
            marginBottom: 8,
            background: "red",
          }}
        />
        // <Story key={story} item={flatTree[story]} {...props} />
      ))}
    </GroupWrapper>
  );
});

const flatTree = flattenTree(tree);

export const GroupComponent = TLShapeUtil.Component<GroupShape, HTMLDivElement>(
  ({ shape, events, meta }, ref) => {
    return (
      <HTMLContainer ref={ref} {...events}>
        <StoryGroup {...meta} shape={shape} />
      </HTMLContainer>
    );
  }
);
