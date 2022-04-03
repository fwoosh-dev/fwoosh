import React, { Suspense } from "react";
import { render } from "@fwoosh/app/render";
import { useParams } from "react-router-dom";
import dlv from "dlv";
import { useId } from "@radix-ui/react-id";
import { Stories } from "@fwoosh/app/stories";
import { useDocs } from "@fwoosh/app/docs";
import { components, PageWrapper, styled, Spinner, PropsTable } from "@fwoosh/components";
import * as Collapsible from "@radix-ui/react-collapsible";
import { paramCase } from "change-case";

import ErrorBoundary from "./ErrorBoundary";
import { useStoryTree } from "../hooks/useStoryTree";
import { StyledMarkdown } from "./StyledMarkdown";
import * as styles from "./DocsPage.module.css";
import { ThemeToggle } from "./ThemeToggle";

const DocsLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr minmax(200px, 300px)",
});

const StoryPreview = styled("div", {
  border: "1px solid $gray7",
  px: 4,
  py: 8,
  borderRadius: "4px",

  variants: {
    state: {
      open: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottom: "none",
      },
    },
  },
});

const ShowCodeButton = styled("button", {
  px: 2,
  position: "absolute",
  bottom: 0,
  right: 0,
  borderTop: "1px solid $gray7",
  borderLeft: "1px solid $gray7",
  borderTopLeftRadius: 4,
  color: "$gray10",
});

const QuickNav = styled("div", {
  my: 10,
  position: "sticky",
  top: "$4",
  height: "fit-content",
  px: 8,
});

const NavHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  px: 2,
  my: 2,
});

const NavTitle = styled("h1", {
  text: "xl",
  color: "$gray11",
  flex: 1,
});

const TitleNavItem = styled("li", {
  height: "$8",
  text: "sm",
  color: "$gray10",
  display: "flex",
  alignItems: "center",
  px: 2,

  "&:hover": {
    color: "$gray11",
    backgroundColor: "$gray2",
  },

  "&:active": {
    color: "$gray11",
    backgroundColor: "$gray4",
  },
});

const NavGroup = styled("div", {
  [`&  ${TitleNavItem}`]: {
    pl: 5,
  },
});

const StoryDiv = React.memo(
  ({ slug, code }: { slug: string; code: string }) => {
    const id = useId();
    const [codeShowing, codeShowingSet] = React.useState(false);

    React.useEffect(() => {
      render(id, slug);
    }, [id, slug]);

    return (
      <Collapsible.Root open={codeShowing} onOpenChange={codeShowingSet}>
        <div className="relative">
          <StoryPreview state={codeShowing ? "open" : undefined} id={id} />
          <Collapsible.Trigger asChild={true}>
            <ShowCodeButton>
              {codeShowing ? "Hide" : "Show"} code
            </ShowCodeButton>
          </Collapsible.Trigger>
        </div>
        <Collapsible.Content>
          <StyledMarkdown className={codeShowing && styles.showingCode}>
            {code}
          </StyledMarkdown>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }
);

export const DocsPage = () => {
  const tree = useStoryTree();
  const params = useParams<{ docsPath: string }>();
  const docs = useDocs(params.docsPath);
  const [, name] = params.docsPath?.split("-") || [];
  const [firstStory, ...stories] = React.useMemo(() => {
    if (!params.docsPath) {
      return [];
    }

    const path = params.docsPath.split("-");
    return dlv(tree, path) as Stories[string][];
  }, [params.docsPath]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner delay={300} />}>
        <DocsLayout>
          <PageWrapper>
            <components.h1 id="intro">{name}</components.h1>
            {firstStory && (
              <>
                {firstStory.comment && (
                  <StyledMarkdown>{firstStory.comment}</StyledMarkdown>
                )}
                <StoryDiv slug={firstStory.slug} code={firstStory.code} />
              </>
            )}
            <PropsTable docs={docs} />
            <components.h2 id="stories">Stories</components.h2>
            {stories.map((story) => {
              return (
                <div key={story.slug}>
                  <components.h3 id={paramCase(story.title)}>
                    {story.title}
                  </components.h3>
                  {story.comment && (
                    <StyledMarkdown>{story.comment}</StyledMarkdown>
                  )}
                  <StoryDiv slug={story.slug} code={story.code} />
                </div>
              );
            })}
          </PageWrapper>
          <QuickNav>
            <NavHeader>
              <NavTitle>Quick nav</NavTitle>
              <ThemeToggle />
            </NavHeader>
            <ul>
              <a href="#intro">
                <TitleNavItem>Introduction</TitleNavItem>
              </a>
              <a href="#props">
                <TitleNavItem>Properties</TitleNavItem>
              </a>
              <a href="#stories">
                <TitleNavItem>Stories</TitleNavItem>
              </a>
              <NavGroup>
                {stories.map((story) => {
                  return (
                    <a href={`#${paramCase(story.title)}`}>
                      <TitleNavItem key={story.slug}>
                        {story.title}
                      </TitleNavItem>
                    </a>
                  );
                })}
              </NavGroup>
            </ul>
          </QuickNav>
        </DocsLayout>
      </Suspense>
    </ErrorBoundary>
  );
};
