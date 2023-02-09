import React, { Suspense } from "react";
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
} from "@fwoosh/components";
import * as Collapsible from "@radix-ui/react-collapsible";
import { capitalCase, paramCase } from "change-case";
import { titleCase } from "title-case";
import { StorySidebarChildItem } from "@fwoosh/types";

import { useRender } from "../hooks/useRender";
import { PageSwitchButton } from "./PageSwitchButtons";
import { useActiveHeader } from "../hooks/useActiveHeader";
import { StoryIdContext } from "./Story";
import { ToolPanels } from "./ToolPanels";
import { GlobalToolbarControls, ToolbarControls } from "./toolbar";
import { WorkbenchToolbarItems } from "./toolbar/WorkbenchToolbarItems";

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

const StoryPreviewWrapper = styled("div", {
  borderWidth: "$sm",
  borderStyle: "$solid",
  borderColor: "$gray6",
  borderRadius: "$sm",
  my: 8,
});

const StoryPreviewArea = styled("div", {
  px: 4,
  py: 8,
  overflow: "auto",
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

const StoryDiv = React.memo(
  ({
    slug,
    showSpinnerWhileLoading,
    defaultOpen,
  }: {
    slug: string;
    showSpinnerWhileLoading?: boolean;
    defaultOpen: boolean;
  }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    const id = useId();
    const { ref, hasRendered } = useRender({ id, slug });

    return (
      <StoryIdContext.Provider value={id}>
        <StoryPreviewWrapper>
          {isOpen && (
            <HeaderBar>
              <GlobalToolbarControls />
              <ToolbarControls>
                <Suspense fallback={<Spinner size={5} />}>
                  <WorkbenchToolbarItems />
                </Suspense>
              </ToolbarControls>
              <GlobalToolbarControls />
            </HeaderBar>
          )}

          <StoryPreviewArea>
            <StoryPreview>
              <div ref={ref} />
            </StoryPreview>
          </StoryPreviewArea>

          {isOpen && <ToolPanels storySlug={slug} />}
        </StoryPreviewWrapper>

        {showSpinnerWhileLoading && !hasRendered && (
          <OverlaySpinner>
            <Spinner delay={2000} />
          </OverlaySpinner>
        )}
      </StoryIdContext.Provider>
    );
  }
);

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
          <MDXContent compiledSource={firstStory.story.comment} />
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
                  <MDXContent compiledSource={story.story.comment} />
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
