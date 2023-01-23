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

export const DocsComponent = TLShapeUtil.Component<DocsShape, HTMLDivElement>(
  ({ shape, events }, ref) => {
    const item = flattenTree(tree)[shape.id];
    const [measureRef, bounds] = useMeasure();

    if (!item) {
      return (
        <HTMLContainer ref={ref} {...events}>
          {""}
        </HTMLContainer>
      );
    }

    const { component: Component, grouping, slug, title } = item;
    const groups = grouping.split("/");

    if (!shape.size[1]) {
      machine.send("UPDATE_DIMENSIONS", {
        id: shape.id,
        width: bounds.width,
        height: bounds.height,
      });
    }

    return (
      <HTMLContainer ref={ref} {...events}>
        <React.Suspense fallback={<Spinner delay={1000} />}>
          <ItemWrapper ref={measureRef}>
            <StoryTitle>
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
      </HTMLContainer>
    );
  }
);
