import * as React from "react";
import { stories } from "@fwoosh/app/stories";
import { styled } from "@fwoosh/styling";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-feather";
import { IconButton, Tooltip } from "@fwoosh/components";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$10",
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
});

const Grouping = styled("div", {
  fontWeight: 300,
  mr: 3,
  color: "$gray9",
});

const ItemWrapper = styled("div", {
  borderRadius: "$round",
  borderWidth: "$sm",
  borderStyle: "$solid",
  borderColor: "$gray7",
});

const StoryWrapper = styled("div", {
  p: 4,
});

export const List = () => {
  return (
    <Container>
      {Object.entries(stories).map(([key, story]) => {
        if (story.type === "mdx") {
          return null;
        }

        const { component: Component, title, grouping, slug } = story;

        return (
          <ItemWrapper>
            <StoryTitle>
              <Grouping>{grouping.replace(/\//g, " / ")}</Grouping> {title}
              <Split />
              <Tooltip message="Open story">
                <IconButton as={Link} to={`/storybook/${slug}`}>
                  <ExternalLink />
                </IconButton>
              </Tooltip>
            </StoryTitle>
            <StoryWrapper>
              <Component key={key} />
            </StoryWrapper>
          </ItemWrapper>
        );
      })}
    </Container>
  );
};
