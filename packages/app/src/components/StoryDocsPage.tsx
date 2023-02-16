import * as React from "react";
import { useId } from "@radix-ui/react-id";
import { styled } from "@fwoosh/styling";
import {
  components,
  PageWrapper,
  Spinner,
  QuickNav,
  DocsLayout,
  MDXContent,
  HeaderBar,
  IconButton,
  Tooltip,
} from "@fwoosh/components";
import { capitalCase, paramCase } from "change-case";
import { titleCase } from "title-case";
import { StorySidebarChildItem } from "@fwoosh/types";

import { useRender } from "../hooks/useRender";
import { PageSwitchButton } from "./PageSwitchButtons";
import { useActiveHeader } from "../hooks/useActiveHeader";
import { StoryIdContext } from "./Story";
import { ToolPanels } from "./ToolPanels";
import { GlobalToolbarControls, ToolbarControls } from "./toolbar";
import { Minus, Plus } from "react-feather";
import { panels } from "@fwoosh/app/ui";
import { useToolbarControls } from "../hooks/useToolbarControls";
import { ParameterContext, useMdxContent, useParameters } from "@fwoosh/hooks";

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

const StoryPreviewWrapperSpacing = styled("div", {
  my: 8,
  position: "relative",
});

const StoryPreviewWrapper = styled("div", {
  borderWidth: "$sm",
  borderStyle: "$solid",
  borderColor: "$gray6",
  borderRadius: "$sm",
});

const StoryPreviewArea = styled("div", {
  px: 4,
  py: 8,
  overflow: "auto",
});

const ToolsArea = styled("div", {
  maxHeight: 400,
  display: "flex",
  flexDirection: "column",
});

const StoryPreview = styled("div", {
  position: "relative",
});

const OverlaySpinner = styled("div", {
  background: "$gray1",
  position: "absolute",
  inset: 0,
  zIndex: 100000,
});

const ExpandToggle = styled("div", {
  position: "absolute",
  right: 0,
  bottom: 0,
  top: "$2",
  paddingLeft: "$2",
  transform: "translate(calc(100%))",
  opacity: 0,

  [`&:hover, &:focus, ${StoryPreviewWrapperSpacing}:hover &`]: {
    opacity: 1,
  },
});

const StoryToolbar = () => {
  const id = React.useContext(StoryIdContext);
  const { storyControls } = useToolbarControls();
  const parameters = useParameters();

  if (!storyControls.length) {
    return null;
  }

  return (
    <ParameterContext.Provider value={parameters}>
      <React.Suspense fallback={<Spinner size={5} />}>
        <HeaderBar>
          <GlobalToolbarControls />
          <ToolbarControls>
            {storyControls.map((Control) => (
              <Control key={Control.componentName} storyPreviewId={id} />
            ))}
          </ToolbarControls>
          <GlobalToolbarControls />
        </HeaderBar>
      </React.Suspense>
    </ParameterContext.Provider>
  );
};

const StoryDiv = React.memo(function StoryDiv({
  slug,
  showSpinnerWhileLoading,
  defaultOpen,
}: {
  slug: string;
  showSpinnerWhileLoading?: boolean;
  defaultOpen: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const id = useId();
  const { ref, hasRendered } = useRender({ id, slug });

  return (
    <StoryIdContext.Provider value={id}>
      <StoryPreviewWrapperSpacing>
        <StoryPreviewWrapper>
          {isOpen && <StoryToolbar />}

          <StoryPreviewArea>
            <StoryPreview>
              <div ref={ref} />
            </StoryPreview>
          </StoryPreviewArea>

          {panels.length > 0 && isOpen && (
            <ToolsArea>
              <ToolPanels storySlug={slug} />
            </ToolsArea>
          )}
        </StoryPreviewWrapper>

        <ExpandToggle>
          {isOpen ? (
            <Tooltip message="Collapse tools">
              <IconButton onClick={() => setIsOpen(false)}>
                <Minus />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip message="Expand tools">
              <IconButton onClick={() => setIsOpen(true)}>
                <Plus />
              </IconButton>
            </Tooltip>
          )}
        </ExpandToggle>
      </StoryPreviewWrapperSpacing>

      {showSpinnerWhileLoading && !hasRendered && (
        <OverlaySpinner>
          <Spinner delay={2000} />
        </OverlaySpinner>
      )}
    </StoryIdContext.Provider>
  );
});

function LazyComment({ comment: rawComment }: { comment: string }) {
  const comment = useMdxContent(rawComment);

  if (!comment) {
    return null;
  }

  return <MDXContent compiledSource={comment} />;
}

interface PageContentProps {
  stories: StorySidebarChildItem[];
}

export const PageContent = ({
  stories: [firstStory, ...stories],
}: PageContentProps) => {
  let docsIntro: React.ReactNode = null;

  if (
    firstStory &&
    firstStory.type === "story" &&
    firstStory.story.type === "basic"
  ) {
    docsIntro = (
      <>
        {firstStory.story.comment && (
          <LazyComment comment={firstStory.story.comment} />
        )}
        <StoryDiv
          slug={firstStory.story.slug}
          key={firstStory.story.slug}
          showSpinnerWhileLoading={true}
          defaultOpen={true}
        />
      </>
    );
  }

  return (
    <>
      {docsIntro}
      {stories.length > 0 && (
        <>
          <HeaderWrapper data-link-group>
            <HeaderLink id="stories" title="Stories" />
            <components.h2 id="stories">Stories</components.h2>
          </HeaderWrapper>
          {stories.map((story) => {
            if (story.type === "tree" || story.story.type === "mdx") {
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
                  <LazyComment comment={story.story.comment} />
                )}
                <StoryDiv slug={story.story.slug} defaultOpen={false} />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export const StoryDocsPageContent = ({
  name,
  stories: [firstStory, ...stories],
  children,
}: PageContentProps & { name: string; children?: React.ReactNode }) => {
  const quickNavRef = React.useRef<HTMLDivElement>(null);

  useActiveHeader(quickNavRef);

  return (
    <PageWrapper style={{ position: "relative" }}>
      <div>
        <components.h1 id="intro">{titleCase(name)}</components.h1>
        <PageContent stories={[firstStory, ...stories]} />
      </div>
      {children}
    </PageWrapper>
  );
};

export const StoryDocsPage = ({
  name,
  stories: [firstStory, ...stories],
}: PageContentProps & { name: string }) => {
  const quickNavRef = React.useRef<HTMLDivElement>(null);

  useActiveHeader(quickNavRef);

  return (
    <DocsLayout>
      <StoryDocsPageContent name={name} stories={[firstStory, ...stories]}>
        <PageSwitchButton current={firstStory.id} />
      </StoryDocsPageContent>
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

          {stories.length > 0 && (
            <>
              <QuickNav.Item>
                <QuickNav.Link href="#stories">Stories</QuickNav.Link>
              </QuickNav.Item>
              <QuickNav.Group>
                {stories.map((story) => {
                  if (story.type === "tree" || story.story.type === "mdx") {
                    return null;
                  }

                  const hash = `#${paramCase(story.story.title)}`;

                  return (
                    <QuickNav.Item key={hash}>
                      <QuickNav.Link href={hash}>
                        {capitalCase(story.story.title)}
                      </QuickNav.Link>
                    </QuickNav.Item>
                  );
                })}
              </QuickNav.Group>
            </>
          )}
        </ol>
      </QuickNav.Root>
    </DocsLayout>
  );
};
