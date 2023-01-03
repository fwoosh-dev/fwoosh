import React, { Suspense } from "react";
import { useLocation, useParams } from "react-router-dom";
import equal from "fast-deep-equal/react";
import type { ComponentDoc } from "react-docgen-typescript";
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
} from "@fwoosh/components";
import * as Collapsible from "@radix-ui/react-collapsible";
import { paramCase, headerCase } from "change-case";
import { stories } from "@fwoosh/app/stories";
import { StorySidebarChildItem, StoryTreeItem } from "@fwoosh/app/ui";

import ErrorBoundary from "./ErrorBoundary";
import { getStoryGroup, useStoryTree } from "../hooks/useStoryTree";
import * as styles from "./DocsPage.module.css";
import { useRender } from "../hooks/useRender";
import { MDXProvider } from "@mdx-js/react";

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
  mb: 10,
  position: "sticky",
  top: "$10",
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

const CollapsibleRoot = styled(Collapsible.Root, {
  position: "relative",
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
          <StyledMarkdown className={codeShowing && styles.showingCode}>
            {code}
          </StyledMarkdown>
        </Collapsible.Content>
      </CollapsibleRoot>
    );
  }
);

const DocsPropsTable = ({
  story,
  firstStory,
}: {
  story: BasicStoryData;
  firstStory?: StoryTreeItem;
}) => {
  const key = story?.slug || "none";
  const docs = useDocs(key, story?.component?._payload?._result, story?.meta);
  const firstStoryDocs = useDocs(
    firstStory?.story.slug || "none",
    firstStory?.story.component?._payload?._result,
    firstStory?.story.meta
  );

  if (equal(docs, firstStoryDocs)) {
    return null;
  }

  return (
    <div style={{ height: "fit-content" }}>
      <PropsTable docs={docs} hasTitle />
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
  const name = nameParts.map((p) => headerCase(p)).join(" ");

  return (
    <DocsLayout>
      <PageWrapper>
        <components.h1 id="intro">{name}</components.h1>
        {firstStory && (
          <>
            {firstStory.story.comment && (
              <StyledMarkdown>{firstStory.story.comment}</StyledMarkdown>
            )}
            <Suspense fallback={"SUSPENDED SECOND LEVEL"}>
              <StoryDiv
                slug={firstStory.story.slug}
                code={firstStory.story.code}
                key={firstStory.story.slug}
              />
            </Suspense>
          </>
        )}

        <Suspense fallback={<Spinner style={{ height: 200 }} />}>
          <DocsPropsTable story={firstStory.story} />
        </Suspense>

        {stories.length > 0 && (
          <>
            <components.h2 id="stories">Stories</components.h2>
            {stories.map((story) => {
              if ("mdxFile" in story || "children" in story) {
                return null;
              }

              return (
                <div key={story.story.slug}>
                  <components.h3 id={paramCase(story.story.title)}>
                    {story.story.title}
                  </components.h3>
                  {story.story.comment && (
                    <StyledMarkdown>{story.story.comment}</StyledMarkdown>
                  )}
                  <StoryDiv slug={story.story.slug} code={story.story.code} />
                  <Suspense
                    fallback={<Spinner style={{ height: 200 }} delay={2000} />}
                  >
                    <DocsPropsTable
                      story={story.story}
                      firstStory={firstStory}
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
              if ("mdxFile" in story || "children" in story) {
                return null;
              }

              return (
                <a
                  key={`#${paramCase(story.story.title)}`}
                  href={`#${paramCase(story.story.title)}`}
                >
                  <TitleNavItem key={story.story.slug}>
                    {story.story.title}
                  </TitleNavItem>
                </a>
              );
            })}
          </NavGroup>
        </ul>
      </QuickNav>
    </DocsLayout>
  );
};

const MDXPageWrapper = styled("div", {
  mt: 12,
  mb: 20,
});

const MDXOnlyDocsPage = ({ id }: { id: string }) => {
  const { component: MDXPage } = stories[id];
  return (
    <MDXProvider
      components={
        components as React.ComponentProps<typeof MDXProvider>["components"]
      }
    >
      <MDXPageWrapper>
        <MDXPage />
      </MDXPageWrapper>
    </MDXProvider>
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

  if ("mdxFile" in firstStory) {
    return <MDXOnlyDocsPage id={firstStory.id} />;
  }

  return (
    <StoryDocsPage stories={[firstStory as StoryTreeItem, ...restStories]} />
  );
});

export const DocsPage = React.memo(() => {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname}>
      <Suspense fallback={<Spinner />}>
        <DocsContent />
      </Suspense>
    </ErrorBoundary>
  );
});
