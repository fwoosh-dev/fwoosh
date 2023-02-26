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
import { BasicStoryData, StorySidebarChildItem } from "@fwoosh/types";

import { useRender } from "../hooks/useRender";
import { PageSwitchButton } from "./PageSwitchButtons";
import { useActiveHeader } from "../hooks/useActiveHeader";
import { StoryIdContext } from "./Story";
import { ToolPanels } from "./ToolPanels";
import { GlobalToolbarControls, ToolbarControls } from "./toolbar";
import { Minus, Plus } from "react-feather";
import { panels } from "@fwoosh/app/ui";
import { useToolbarControls } from "../hooks/useToolbarControls";
import { ParameterContext, useDocsPath, useMdxContent } from "@fwoosh/hooks";
import { useParameters } from "../hooks/useParameters";
import { useBuildSearchIndex } from "../hooks/useBuildSearchIndex";
import { Title } from "react-head";
import { WorkbenchCanvasShapesContext } from "../hooks/context";

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

  if (!storyControls.length) {
    return null;
  }

  return (
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
  );
};

const StoryDiv = React.memo(function StoryDiv({
  slug,
  defaultOpen,
}: {
  slug: string;
  defaultOpen: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const id = useId();
  const { ref } = useRender({ id, slug });
  const parameters = useParameters({ id: slug, suspense: true });
  const shapes = React.useContext(WorkbenchCanvasShapesContext);
  const dimensions = shapes?.[slug]?.size ?? [];

  return (
    <ParameterContext.Provider value={parameters}>
      <StoryIdContext.Provider value={id}>
        <StoryPreviewWrapperSpacing data-type="preview">
          <StoryPreviewWrapper>
            {isOpen && <StoryToolbar />}

            <StoryPreviewArea
              style={{
                width: dimensions[0],
                height: dimensions[1],
              }}
            >
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
      </StoryIdContext.Provider>
    </ParameterContext.Provider>
  );
});

function LazyComment({ story }: { story: BasicStoryData }) {
  const comment = useMdxContent(story.slug, story.comment!);

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
        {firstStory.story.comment && <LazyComment story={firstStory.story} />}
        <StoryDiv
          slug={firstStory.story.slug}
          key={firstStory.story.slug}
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
              <React.Fragment key={story.story.slug}>
                <HeaderWrapper data-link-group>
                  <HeaderLink
                    id={paramCase(story.story.title)}
                    title={story.story.title}
                  />
                  <components.h3 id={paramCase(story.story.title)}>
                    {story.story.title}
                  </components.h3>
                </HeaderWrapper>
                {story.story.comment && <LazyComment story={story.story} />}
                <StoryDiv slug={story.story.slug} defaultOpen={false} />
              </React.Fragment>
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
  const docsPath = useDocsPath() ?? "";
  const title = docsPath?.split("-").join("/") ?? "";

  useActiveHeader(quickNavRef);
  useBuildSearchIndex({ title, slug: docsPath });

  return (
    <DocsLayout>
      <Title>{name}</Title>
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
