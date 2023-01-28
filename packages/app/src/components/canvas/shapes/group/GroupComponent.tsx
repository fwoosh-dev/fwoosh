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
import { useId } from "@radix-ui/react-id";

import { CanvasMeta } from "../../constants";
import { machine } from "../../machine";
import { GroupShape } from "./GroupShape";
import { useRender } from "../../../../hooks/useRender";

const GroupWrapper = styled("div", {
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

const StoryList = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$4",
});

const StoryDiv = React.memo(({ story }: { story: StoryData }) => {
  const id = useId();
  const { ref } = useRender({ id, slug: story.slug });

  return <div ref={ref} />;
});

const Story = ({
  item,
  storyId,
}: {
  item: StoryData;
} & Pick<CanvasMeta, "storyId">) => {
  const { grouping, slug, title } = item;
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
          <StoryDiv story={item} />
        </StoryWrapper>
      </ItemWrapper>
    </React.Suspense>
  );
};

const placeholder = (
  <div
    style={{
      height: 100,
      width: 100,
      marginBottom: 8,
      background: "red",
    }}
  />
);

const headings = [
  components.h1,
  components.h2,
  components.h3,
  components.h4,
  components.h5,
  components.h6,
];

const StoryGroup = React.memo(function StoryGroup({
  shape,
  hasMeasured,
  ...props
}: { shape: GroupShape } & CanvasMeta) {
  const [measureRef, bounds] = useMeasure();
  const groups = shape.name.split("-");
  const lastGroup = groups.length - 1;
  const hasChildren = shape.stories.length > 0;

  React.useEffect(() => {
    if (!hasMeasured && bounds.height > 0 && shape.size[0] == 0) {
      const timeout = setTimeout(() => {
        machine.send("UPDATE_DIMENSIONS", {
          id: shape.id,
          width: bounds.width,
          height: bounds.height,
        });
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [bounds.height, bounds.width, shape.id]);

  const Heading = headings[lastGroup];

  return (
    <GroupWrapper ref={measureRef} style={{ width: "100%" }}>
      <Heading css={{ margin: `$4 0 0 0 !important` }}>
        {groups[lastGroup]}
      </Heading>

      {false && hasChildren && (
        <StoryList>
          {shape.stories.map((story) => (
            <Story key={story} item={flatTree[story]} {...props} />
          ))}
        </StoryList>
      )}
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
