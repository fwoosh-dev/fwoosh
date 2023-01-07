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
  QuickNav,
  DocsLayout,
} from "@fwoosh/components";
import * as Collapsible from "@radix-ui/react-collapsible";
import { paramCase, capitalCase } from "change-case";
import { StorySidebarChildItem, StoryTreeItem } from "@fwoosh/app/ui";
import { getStoryGroup, useStoryTree, useHighlightedCode } from "@fwoosh/hooks";

import * as styles from "./DocsPage.module.css";
import { useRender } from "../hooks/useRender";
import { MDXPage } from "./MDXPage";
import { PageSwitchButton } from "./PageSwitchButtons";
import { useActiveHeader } from "../hooks/useActiveHeader";

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
  const quickNavRef = React.useRef<HTMLDivElement>(null);

  useActiveHeader(quickNavRef);

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
        <PageSwitchButton current={firstStory.id} />
      </PageWrapper>
      <QuickNav.Root ref={quickNavRef}>
        <QuickNav.Header>
          <QuickNav.Title>Quick nav</QuickNav.Title>
        </QuickNav.Header>
        <ol>
          <QuickNav.Item>
            <QuickNav.Link href="#intro">Introduction</QuickNav.Link>
          </QuickNav.Item>
          <QuickNav.Item>
            <QuickNav.Link href="#props">Properties</QuickNav.Link>
          </QuickNav.Item>
          <QuickNav.Item>
            <QuickNav.Link href="#stories">Stories</QuickNav.Link>
          </QuickNav.Item>
          <QuickNav.Group>
            {stories.map((story) => {
              if (story.type === "mdx" || story.type === "tree") {
                return null;
              }

              const hash = `#${paramCase(story.story.title)}`;

              return (
                <QuickNav.Item key={hash}>
                  <QuickNav.Link href={hash}>{story.story.title}</QuickNav.Link>
                </QuickNav.Item>
              );
            })}
          </QuickNav.Group>
        </ol>
      </QuickNav.Root>
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
    return <MDXPage page={firstStory} />;
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
