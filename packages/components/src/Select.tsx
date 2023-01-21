import * as React from "react";
import { styled } from "@fwoosh/styling";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronUp, ChevronDown } from "react-feather";

export const Root = Select.Root;
export const Group = Select.Group;
export const Value = Select.Value;

const StyledTrigger = styled(Select.SelectTrigger, {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$round",
  padding: "0 0 0 $3",
  text: "sm",
  height: "$9",
  gap: "$1",
  backgroundColor: "$gray0",
  color: "$gray10",
  borderStyle: "$solid",
  borderWidth: "$sm",
  borderColor: "$gray8",

  "&:hover": { backgroundColor: "$gray2" },
  "&:focus": {
    boxShadow: `0 0 0 3px $colors$gray0, 0 0 0 6px $colors$primary7`,
  },
  "&[data-placeholder]": { color: "$gray9" },
});

export const Trigger = React.forwardRef(
  (
    { children, ...props }: React.ComponentProps<typeof StyledTrigger>,
    forwardedRef: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <StyledTrigger {...props} ref={forwardedRef}>
        {children}
        <Icon>
          <ChevronDown />
        </Icon>
      </StyledTrigger>
    );
  }
);

export const Icon = styled(Select.SelectIcon, {
  color: "@gray11",
  padding: "$2",
  width: "$9",
  height: "$9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledContent = styled(Select.Content, {
  overflow: "hidden",
  backgroundColor: "$gray0",
  borderRadius: "$round",
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
});

const scrollButtonStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "$8",
  backgroundColor: "$gray0",
  color: "$gray11",
  cursor: "default",
};

const ScrollUpButton = styled(Select.ScrollUpButton, scrollButtonStyles);
const ScrollDownButton = styled(Select.ScrollDownButton, scrollButtonStyles);
const Viewport = styled(Select.Viewport, {
  padding: "$1",
});

export const Content = React.forwardRef(
  (
    { children, ...props }: React.ComponentProps<typeof StyledContent>,
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Select.Portal>
        <StyledContent {...props} ref={forwardedRef}>
          <ScrollUpButton>
            <ChevronUp />
          </ScrollUpButton>
          <Viewport>{children}</Viewport>
          <ScrollDownButton>
            <ChevronDown />
          </ScrollDownButton>
        </StyledContent>
      </Select.Portal>
    );
  }
);

const StyledItem = styled(Select.Item, {
  text: "sm",
  color: "$gray11",
  borderRadius: "$round",
  display: "flex",
  alignItems: "center",
  height: "$8",
  padding: "0 $3 0 $8",
  position: "relative",
  userSelect: "none",

  "&[data-disabled]": {
    color: "$gray7",
    pointerEvents: "none",
  },

  "&[data-highlighted]": {
    outline: "none",
    backgroundColor: "$primary3",
    color: "$primary11",
  },
});

const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: "$8",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const Item = React.forwardRef(
  (
    { children, ...props }: React.ComponentProps<typeof StyledItem>,
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <StyledItem {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <StyledItemIndicator>
          <Check />
        </StyledItemIndicator>
      </StyledItem>
    );
  }
);

export const Label = styled(Select.Label, {
  padding: "0 $8",
  height: "$8",
  text: "xs",
  color: "$gray8",
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
});

export const Separator = styled(Select.Separator, {
  height: 1,
  backgroundColor: "$gray5",
  my: 2,
});
