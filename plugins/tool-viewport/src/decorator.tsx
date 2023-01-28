import { IconButton, Select, Tooltip } from "@fwoosh/components";
import { styled } from "@fwoosh/styling";
import { StoryParameters } from "fwoosh";
import * as React from "react";
import { RotateCw, X } from "react-feather";
import { Size } from "./types";
import { sizes, useCurrentSize } from "./useCurrentSize";

const Wrapper = styled("div", {
  minHeight: "100%",
  width: "100%",
  display: "flex",
  backgroundColor: "$gray4",
  maxHeight: "100%",
  overflow: "auto",
});

const ScrollArea = styled("div", {
  flex: 1,
  overflow: "auto",
  minHeight: 0,
});

const Frame = styled("div", {
  border: "1px solid $gray0",
  width: "fit-content",
});

const Controls = styled("div", {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "$2",
  opacity: 0,
});

const FrameWrapper = styled("div", {
  padding: "$10",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "fit-content",
});

const CenterControls = styled("div", {
  justifyContent: "center",
  flex: 1,
  display: "flex",
  alignItems: "center",
  gap: "$2",
});

const ViewportSizeWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  flex: 1,
});

const ControlRow = styled("div", {
  borderBottomWidth: "$sm",
  borderBottomStyle: "$solid",
  borderBottomColor: "$gray7",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  px: 4,
  py: 2,
  gap: "$2",

  [`&:hover ${Controls}`]: {
    opacity: 1,
  },
});

function ViewportSize({
  size,
  slug,
  onSizeChange,
}: {
  size: Size;
  slug: string;
  onSizeChange: (size: Size | undefined) => void;
}) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <ViewportSizeWrapper>
      <ControlRow>
        <Controls />
        <CenterControls>
          <Select.Root
            value={size.name}
            onValueChange={(value) => {
              if (value === "remove") {
                onSizeChange(undefined);
              } else {
                onSizeChange(sizes.find((size) => size.name === value));
              }
            }}
          >
            <Select.Trigger aria-label="Device size">
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="remove">Remove</Select.Item>
              {sizes.map(({ name }) => (
                <Select.Item key={name} value={name}>
                  {name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
          <Tooltip message="Change orientation">
            <IconButton onClick={() => setIsFlipped(!isFlipped)}>
              <RotateCw />
            </IconButton>
          </Tooltip>
        </CenterControls>
        <Controls>
          <Tooltip message="Remove device">
            <IconButton onClick={() => onSizeChange(undefined)}>
              <X />
            </IconButton>
          </Tooltip>
        </Controls>
      </ControlRow>
      <ScrollArea>
        <FrameWrapper>
          <Frame>
            <iframe
              width={isFlipped ? size.height : size.width}
              height={isFlipped ? size.width : size.height}
              src={`/story/${slug}`}
            />
          </Frame>
        </FrameWrapper>
      </ScrollArea>
    </ViewportSizeWrapper>
  );
}

export const viewport =
  (Story: () => any, slug: string, params: StoryParameters) => () => {
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "";
    const isStory = pathname.includes("/story/");
    const [currentSizes, setCurrentSizes] = useCurrentSize(
      params?.viewport?.defaultSize
    );

    if (isStory || currentSizes.length === 0) {
      return <Story />;
    }

    return (
      <Wrapper>
        {currentSizes.map((size, index) => (
          <ViewportSize
            key={size.name}
            size={size}
            slug={slug}
            onSizeChange={(size) => {
              let newSizes = [...currentSizes];

              if (size) {
                newSizes[index] = size;
              } else {
                newSizes.splice(index, 1);
              }

              setCurrentSizes(newSizes);
            }}
          />
        ))}
      </Wrapper>
    );
  };
