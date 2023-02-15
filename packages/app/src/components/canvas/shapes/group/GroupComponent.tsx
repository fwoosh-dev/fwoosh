import { tree } from "@fwoosh/app/stories";
import { PageWrapper } from "@fwoosh/components";
import { styled } from "@fwoosh/styling";
import { StoryTreeItem } from "@fwoosh/types";
import { flattenTreeItems } from "@fwoosh/utils";
import { components } from "@fwoosh/components";
import { HTMLContainer, TLShapeUtil } from "@tldraw/core";
import * as React from "react";

import { CanvasMeta } from "../../constants";
import { GroupShape } from "./GroupShape";
import { StoryDocsPageContent } from "../../../StoryDocsPage";
import { useShapeMeasure } from "../useShapeMeasure";

const GroupWrapper = styled("div", {
  pointerEvents: "auto",
  width: "max-content",
  padding: "$2",
});

const DocsGroupWrapper = styled(GroupWrapper, {
  width: "800px",
});

const DocsPageWrapper = styled(PageWrapper, {
  borderWidth: "$sm",
  borderStyle: "$solid",
  borderColor: "$gray7",
  borderRadius: "$round",
});

const StoryList = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$4",
});

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
  mode,
}: { shape: GroupShape } & CanvasMeta) {
  const groups = shape.name.split("-");
  const lastGroup = groups.length - 1;
  const Heading = headings[lastGroup];

  const { basicStories, mdxStories } = React.useMemo(() => {
    const flatTree = flattenTreeItems(tree);
    const stories = shape.stories.map((id) => flatTree[id]);

    return {
      basicStories: stories.filter(
        (s) => s.type === "story" && s.story.type === "basic"
      ),
      mdxStories: stories.filter(
        (s): s is StoryTreeItem => s.type === "story" && s.story.type === "mdx"
      ),
    };
  }, [shape.stories]);

  const id = `group-${shape.id}`;
  const measureRef = useShapeMeasure(shape, id);

  if (shape.visibility === "hidden") {
    return null;
  }

  if (mode === "docs") {
    return (
      <DocsGroupWrapper id={id} data-here ref={measureRef}>
        {basicStories.length === 0 && (
          <Heading css={{ margin: `$6 0 $10 0 !important` }}>
            {groups[lastGroup]}
          </Heading>
        )}
        {basicStories.length > 0 && (
          <StoryDocsPageContent
            name={groups[lastGroup]}
            stories={basicStories}
          />
        )}
        {mdxStories.length > 0 && (
          <StoryList>
            {mdxStories.map((story) => {
              if (story.story.type === "mdx") {
                return (
                  <DocsPageWrapper key={story.id}>
                    <story.story.component />
                  </DocsPageWrapper>
                );
              }

              return null;
            })}
          </StoryList>
        )}
      </DocsGroupWrapper>
    );
  }

  return (
    <GroupWrapper id={id} ref={measureRef} style={{ width: "100%" }}>
      <Heading css={{ margin: `$4 0 0 0 !important` }}>
        {groups[lastGroup]}
      </Heading>
    </GroupWrapper>
  );
});

export const GroupComponent = TLShapeUtil.Component<GroupShape, HTMLDivElement>(
  ({ shape, events, meta }, ref) => {
    return (
      <HTMLContainer ref={ref} {...events}>
        {shape.visibility !== "hidden" && (
          <React.Suspense>
            <StoryGroup {...meta} shape={shape} />
          </React.Suspense>
        )}
      </HTMLContainer>
    );
  }
);
