import { flattenTree } from "@fwoosh/utils";
import { HTMLContainer, TLShapeUtil } from "@tldraw/core";
import * as React from "react";
import useMeasure from "react-use-measure";
import { styled } from "@fwoosh/styling";
import { IconButton, Spinner, Tooltip } from "@fwoosh/components";

import { DocsShape } from "./DocsShape";
import { machine } from "../../machine";
import { ExternalLink } from "react-feather";
import { Link } from "react-router-dom";
import { CanvasMeta } from "../../constants";
import { StoryData } from "@fwoosh/types";
import { tree } from "@fwoosh/app/stories";
import { useId } from "@radix-ui/react-id";
import { useRender } from "../../../../hooks/useRender";

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

const StoryDiv = React.memo(({ story }: { story: StoryData }) => {
  const id = useId();
  const { ref } = useRender({ id, slug: story.slug });

  return <div ref={ref} />;
});

const Story = React.memo(
  ({
    item,
    storyId,
    shape,
    hasMeasured,
  }: {
    item: StoryData;
    shape: DocsShape;
  } & CanvasMeta) => {
    const { grouping, slug, title } = item;
    const groups = grouping.split("/");
    const [measureRef, bounds] = useMeasure();

    React.useEffect(() => {
      if (!hasMeasured && bounds.height > 0 && shape.size[0] == 0) {
        const timeout = setTimeout(() => {
          machine.send("UPDATE_DIMENSIONS", {
            id: item.slug,
            width: bounds.width,
            height: bounds.height,
          });
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }, [bounds.height, bounds.width, item.slug, shape.size[0]]);

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
            <StoryDiv story={item} />
          </StoryWrapper>
        </ItemWrapper>
      </React.Suspense>
    );
  }
);

export const DocsComponent = TLShapeUtil.Component<
  DocsShape,
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
      <Story item={item} {...meta} shape={shape} />
    </HTMLContainer>
  );
});
