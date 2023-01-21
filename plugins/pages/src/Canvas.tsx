import * as React from "react";
import { tree } from "@fwoosh/app/stories";
import { styled } from "@fwoosh/styling";
import { components } from "@fwoosh/components";
import { StoryDocPageContent } from "@fwoosh/app";
import { StoryBasicTreeItem, StorySidebarChildItem } from "@fwoosh/types";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

const PanWrapper = styled("div", {
  height: "100%",

  "& > *": {
    width: "100% !important",
    height: "100% !important",
  },
});

const Container = styled("div", {
  display: "grid",
  alignItems: "flex-start",
  gap: "$28",
  padding: "$24",
});

const Page = styled("div", {
  px: 10,
  py: 16,
  mb: 16,
  borderWidth: "$sm",
  borderStyle: "$solid",
  borderColor: "$gray7",
  background: "$gray0",
});

const Column = styled("div", {
  flex: 1,
});

const Header = styled("header", {
  height: "$20",
  display: "flex",
  alignItems: "center",
  mb: 12,
});

function CanvasItem({
  item,
  level,
}: {
  item: StorySidebarChildItem;
  level: number;
}) {
  console.log(item);
  if (item.name === "Canvas" || item.name === "Changelog") {
    return null;
  }

  if (item.type === "story") {
    const { component: Component, slug } = item.story;
    const page = (
      <Page>
        <Component key={slug} />
      </Page>
    );

    if (level !== 0) {
      return page;
    }

    return (
      <Column>
        <Header />
        {page}
      </Column>
    );
  }

  if (item.type === "tree") {
    const storyChildren = item.children.filter(
      (child) => child.type === "story" && child.story.type === "basic"
    );
    const otherChildren = item.children.filter(
      (child) => !(child.type === "story" && child.story.type === "basic")
    );

    return (
      <Column>
        <Header>
          <components.h1
            style={{
              fontSize: level === 0 ? "4em" : "3rem",
              lineHeight: level === 0 ? "6rem" : "4.5rem",
              marginBottom: 0,
            }}
          >
            {item.name}
          </components.h1>
        </Header>

        {storyChildren.length > 0 && (
          <>
            <Page>
              <StoryDocPageContent
                stories={
                  storyChildren as [
                    StoryBasicTreeItem,
                    ...StorySidebarChildItem[]
                  ]
                }
              />
            </Page>
          </>
        )}

        {otherChildren.map((child) => (
          <CanvasItem item={child} level={level + 1} />
        ))}
      </Column>
    );
  }

  return null;
}

export const Canvas = () => {
  const wrapperRef = React.useRef<ReactZoomPanPinchRef>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Prevent browser from navigating back/forward when
  // the user scrolls left/right on the timeline.
  React.useEffect(() => {
    const { current } = containerRef;

    if (!current) {
      return;
    }

    function cancelZoom(e: WheelEvent) {
      e.preventDefault();
    }

    // We need to use the `passive: false` option to prevent the default
    // behavior of the event. Without this the browser will still zoom
    // in/out on the page.
    current.addEventListener("wheel", cancelZoom, { passive: false });

    return () => {
      current.removeEventListener("wheel", cancelZoom);
    };
  }, []);

  return (
    <PanWrapper
      onWheel={(e) => {
        if (!wrapperRef.current) {
          return;
        }

        const newX = wrapperRef.current.state.positionX - e.deltaX;
        const newY = wrapperRef.current.state.positionY - e.deltaY;
        wrapperRef.current.setTransform(newX, newY, NaN, 0, undefined);
      }}
    >
      <TransformWrapper
        minScale={0.25}
        maxScale={2.5}
        panning={{ velocityDisabled: true }}
        wheel={{ step: 0.03, wheelDisabled: true }}
        ref={wrapperRef}
      >
        <TransformComponent>
          <Container
            ref={containerRef}
            style={{
              gridTemplateColumns: `repeat(${tree.length}, 700px)`,
            }}
          >
            {tree.map((item) => (
              <CanvasItem item={item} level={0} />
            ))}
          </Container>
        </TransformComponent>
      </TransformWrapper>
    </PanWrapper>
  );
};
