import React from "react";

import { tree } from "@fwoosh/app/stories";
import { styled } from "@fwoosh/styling";
import { ChevronRightIcon } from "@fwoosh/components";
import { Link, useLocation } from "react-router-dom";
import { StoryData } from "@fwoosh/types";
import {
  convertMetaTitleToUrlParam,
  resetContentScrollPosition,
  getNextStory,
  getPreviousStory,
} from "@fwoosh/utils";

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  flex: 1,
  mt: 16,
});

const ButtonRow = styled("div", {
  display: "flex",
  alignItems: "center",
  borderTopWidth: "$sm",
  borderTopStyle: "solid",
  borderTopColor: "$gray7",
  pt: 10,
});

const Split = styled("div", {
  flex: 1,
});

const IconWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "$10",
  width: "$10",
});

const NavButton = styled(Link, {
  py: 2,
  px: 4,
  borderRadius: "$round",
  color: "$gray11",
  display: "flex",
  alignItems: "center",
  gap: "$1",

  "&:hover": {
    backgroundColor: "$gray3",
  },
});

const SubText = styled("div", {
  text: "xs",
  color: "$gray10",
});

const SubTextWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$1",
});

function splitAtIndex(str: string, index: number) {
  return [str.substring(0, index), str.substring(index + 1)];
}

function StoryTitle({
  story,
  renderStoryNames,
}: {
  story: StoryData;
  renderStoryNames?: boolean;
}) {
  let group: string;
  let storyName: string;

  if (story.type === "basic") {
    if (renderStoryNames) {
      group = story.grouping;
      storyName = story.title;
    } else {
      [group, storyName] = splitAtIndex(
        story.grouping,
        story.grouping.lastIndexOf("/")
      );
    }
  } else {
    [group, storyName] = splitAtIndex(
      story.title,
      story.title.lastIndexOf("/")
    );
  }

  return (
    <SubTextWrapper>
      {group && <SubText>{modifyTitle(group)}</SubText>}
      <div>{modifyTitle(storyName)}</div>
    </SubTextWrapper>
  );
}

function modifyTitle(title: string) {
  return title.replace(/\//g, " / ");
}

interface PageSwitchButtonProps {
  current: string;
}

export function PageSwitchButton({ current }: PageSwitchButtonProps) {
  const location = useLocation();
  const isStorybook = location.pathname.startsWith("/storybook");
  const { prev, next } = React.useMemo(() => {
    return {
      prev: getPreviousStory(tree, current),
      next: getNextStory(tree, current, !isStorybook),
    };
  }, [tree, isStorybook]);
  const getUrl = React.useCallback(
    (data: StoryData) => {
      if (isStorybook) {
        if (data.type === "mdx") {
          return `/storybook/docs/${data.slug}`;
        }

        return `/storybook/${data.slug}`;
      }

      if (data.type === "mdx") {
        return `/docs/${data.slug}`;
      }

      return `/docs/${convertMetaTitleToUrlParam(data.grouping)}`;
    },
    [isStorybook]
  );

  return (
    <Wrapper>
      <ButtonRow>
        {prev && (
          <NavButton
            to={getUrl(prev)}
            style={{ paddingLeft: 4 }}
            onClick={resetContentScrollPosition}
          >
            <IconWrapper>
              <ChevronRightIcon style={{ transform: "rotate(180deg)" }} />
            </IconWrapper>
            <StoryTitle renderStoryNames={isStorybook} story={prev} />
          </NavButton>
        )}
        <Split />
        {next && (
          <NavButton
            to={getUrl(next)}
            style={{ paddingRight: 4, textAlign: "right" }}
            onClick={resetContentScrollPosition}
          >
            <StoryTitle renderStoryNames={isStorybook} story={next} />
            <IconWrapper>
              <ChevronRightIcon />
            </IconWrapper>
          </NavButton>
        )}
      </ButtonRow>
    </Wrapper>
  );
}
