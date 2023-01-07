import React, { Suspense } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useId } from "@radix-ui/react-id";
import { BasicStoryData } from "@fwoosh/app/stories";
import { useDocs } from "@fwoosh/app/docs";
import {
  components,
  PageWrapper,
  styled,
  Spinner,
  PropsTable,
  StyledMarkdown,
  ErrorBoundary,
} from "@fwoosh/components";
import * as Collapsible from "@radix-ui/react-collapsible";
import { paramCase, capitalCase } from "change-case";
import { StorySidebarChildItem, StoryTreeItem } from "@fwoosh/app/ui";
import { getStoryGroup, useStoryTree, useHighlightedCode } from "@fwoosh/hooks";

import * as styles from "./DocsPage.module.css";
import { useRender } from "../hooks/useRender";
import { MDXPage } from "./MDXPage";

const HeaderWrapper = styled("div", {
  position: "relative",
});

const HeaderLink = ({ title, id }: { title: React.ReactNode; id: string }) => {
  return (
    <a data-link-icon href={`#${id}`} tabIndex={-1}>
      <span className="visually-hidden">Link to the {title} section</span>
    </a>
  );
};

const DocsLayout = styled("div", {
  display: "grid",

  "@lg": {
    gridTemplateColumns: "1fr minmax(200px, 300px)",
  },
});

const StoryPreview = styled("div", {
  border: "1px solid $gray7",
  px: 4,
  py: 8,
  borderRadius: "4px",
  overflow: "auto",

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

const QuickNav = styled("nav", {
  mb: 10,
  position: "sticky",
  top: "$10",
  height: "fit-content",
  px: 8,
  display: "none",

  "@lg": {
    display: "block",
  },
});

const QuickNavLink = styled("a", {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
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

const CollapsibleRoot = styled(Collapsible.Root, {
  position: "relative",
});

const StoryCode = React.memo(({ code }: { code: string }) => {
  const highlightedCode = useHighlightedCode({ code });

  if (!highlightedCode) {
    return null;
  }

  return (
    <StyledMarkdown className={styles.showingCode}>
      {highlightedCode}
    </StyledMarkdown>
  );
});

const StoryDiv = React.memo(
  ({ slug, code }: { slug: string; code: string }) => {
    const id = useId();
    const [codeShowing, codeShowingSet] = React.useState(false);
    const ref = useRender({ id, slug });

    return (
      <CollapsibleRoot open={codeShowing} onOpenChange={codeShowingSet}>
        <StoryPreview state={codeShowing ? "open" : undefined} ref={ref} />
        <Collapsible.Trigger asChild={true}>
          <ShowCodeButton>{codeShowing ? "Hide" : "Show"} code</ShowCodeButton>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Suspense fallback={<Spinner delay={2000} />}>
            <StoryCode code={code} />
          </Suspense>
        </Collapsible.Content>
      </CollapsibleRoot>
    );
  }
);

const DocsPropsTable = ({
  story,
  meta,
  hasTitle,
}: {
  story: BasicStoryData;
  meta: { component: any };
  hasTitle?: boolean | string;
}) => {
  const docs = useDocs(story.slug, meta);

  return (
    <div style={{ height: "fit-content" }}>
      <PropsTable docs={docs} hasTitle={hasTitle} />
    </div>
  );
};

const StoryDocsPage = ({
  stories: [firstStory, ...stories],
}: {
  stories: [StoryTreeItem, ...StorySidebarChildItem[]];
}) => {
  const params = useParams<{ docsPath: string }>();
  const [, ...nameParts] = params.docsPath?.split("-") || [];
  const name = nameParts.map((p) => capitalCase(p)).join(" ");

  return (
    <DocsLayout>
      <PageWrapper>
        <components.h1 id="intro">{name}</components.h1>
        {firstStory && (
          <>
            {firstStory.story.comment && (
              <StyledMarkdown>{firstStory.story.comment}</StyledMarkdown>
            )}
            <StoryDiv
              slug={firstStory.story.slug}
              code={firstStory.story.code}
              key={firstStory.story.slug}
            />
            <Suspense fallback={<Spinner style={{ height: 200 }} />}>
              <DocsPropsTable
                story={firstStory.story}
                meta={firstStory.story.meta}
                hasTitle="props"
              />
            </Suspense>
          </>
        )}

        {stories.length > 0 && (
          <>
            <HeaderWrapper data-link-group>
              <HeaderLink id="stories" title="Stories" />
              <components.h2 id="stories">Stories</components.h2>
            </HeaderWrapper>
            {stories.map((story) => {
              if (story.type === "mdx" || story.type === "tree") {
                return null;
              }

              return (
                <div key={story.story.slug}>
                  <HeaderWrapper data-link-group>
                    <HeaderLink
                      id={paramCase(story.story.title)}
                      title={story.story.title}
                    />
                    <components.h3 id={paramCase(story.story.title)}>
                      {story.story.title}
                    </components.h3>
                  </HeaderWrapper>
                  {story.story.comment && (
                    <StyledMarkdown>{story.story.comment}</StyledMarkdown>
                  )}
                  <StoryDiv slug={story.story.slug} code={story.story.code} />
                  <Suspense
                    fallback={<Spinner style={{ height: 200 }} delay={2000} />}
                  >
                    <DocsPropsTable
                      story={story.story}
                      meta={story.story?.component?._payload?._result}
                      hasTitle={true}
                    />
                  </Suspense>
                </div>
              );
            })}
          </>
        )}
      </PageWrapper>
      <QuickNav>
        <NavHeader>
          <NavTitle>Quick nav</NavTitle>
        </NavHeader>
        <ol>
          <TitleNavItem>
            <QuickNavLink href="#intro">Introduction</QuickNavLink>
          </TitleNavItem>
          <TitleNavItem>
            <QuickNavLink href="#props">Properties</QuickNavLink>
          </TitleNavItem>
          <TitleNavItem>
            <QuickNavLink href="#stories">Stories</QuickNavLink>
          </TitleNavItem>
          <NavGroup>
            {stories.map((story) => {
              if (story.type === "mdx" || story.type === "tree") {
                return null;
              }

              const hash = `#${paramCase(story.story.title)}`;

              return (
                <TitleNavItem key={hash}>
                  <QuickNavLink href={hash}>{story.story.title}</QuickNavLink>
                </TitleNavItem>
              );
            })}
          </NavGroup>
        </ol>
      </QuickNav>
    </DocsLayout>
  );
};

const DocsContent = React.memo(() => {
  const tree = useStoryTree();
  const params = useParams<{ docsPath: string }>();
  const [firstStory, ...restStories] = React.useMemo(() => {
    if (!params.docsPath) {
      return [];
    }

    const path = params.docsPath.split("-");
    const story = getStoryGroup(tree, path);

    if (!story) {
      throw new Error(`Could not find documentation page: ${params.docsPath}`);
    }

    return story;
  }, [params.docsPath]);

  if (!firstStory) {
    return null;
  }

  if (firstStory.type === "mdx") {
    return <MDXPage id={firstStory.id} />;
  }

  return (
    <StoryDocsPage stories={[firstStory as StoryTreeItem, ...restStories]} />
  );
});

export const DocsPage = React.memo(() => {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname}>
      <Suspense fallback={<Spinner>Loading documentation...</Spinner>}>
        <DocsContent />
      </Suspense>
    </ErrorBoundary>
  );
});
