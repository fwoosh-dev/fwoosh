import * as React from "react";
import { Command } from "cmdk";
import { styled } from "@fwoosh/styling";
import { ChevronRightIcon } from ".";

export const Dialog = styled(Command.Dialog, {
  background: "rgba(0, 0, 0, 0.5)",
  position: "fixed",
  inset: "0",
  fontFamily: "Inter, system-ui",

  "@supports (font-variation-settings: normal)": {
    fontFamily: "Inter Var, system-ui",
  },
});
export const Content = styled("div", {
  background: "$gray1",
  position: "fixed",
  top: "20%",
  borderRadius: "$sm",
  left: "50%",
  maxHeight: "60%",
  transform: "translate(-50%)",
  width: "min(80%, 600px)",
  borderWidth: "$sm",
  borderStyle: "$solid",
  borderColor: "$gray4",
  display: "flex",
  flexDirection: "column",
});
export const Group = styled(Command.Group);
export const Separator = styled(Command.Separator, {
  height: 1,
  background: "$gray5",
  width: "100%",
});
export const Empty = styled(Command.Empty, {
  height: "$20",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  text: "xl",
  color: "$gray11",
});
export const Input = styled(Command.Input, {
  flexShrink: 0,
  height: "$12",
  px: 2,
  text: "lg",
  background: "transparent",
  borderBottomWidth: "$sm",
  borderBottomStyle: "$solid",
  borderBottomColor: "$gray5",
  color: "$gray11",

  "&:focus": {
    outline: "none",
  },
});
export const List = styled(Command.List, {
  flex: 1,
  overflowY: "auto",
  py: 2,
});
export const Loading = styled(Command.Loading);
export const Heading = styled("div", {
  height: "$10",
  color: "$gray8",
  display: "flex",
  alignItems: "center",
  px: 2,
  mx: 2,
  text: "sm",
});

const StyledItem = styled(Command.Item, {
  minHeight: "$10",
  display: "flex",
  alignItems: "center",
  gap: "$1",
  cursor: "pointer",
  color: "$gray11",
  zIndex: 0,
  px: 2,
  position: "relative",

  "&[aria-selected]:before": {
    position: "absolute",
    inset: "0 $2",
    background: "$gray3",
    content: "",
    borderRadius: "$sm",
    zIndex: -1,
  },
});

const ItemIcon = styled("div", {
  height: "$10",
  width: "$8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: 2,
});
const RightIcon = styled(ItemIcon, {
  opacity: 0,

  [`${StyledItem}[aria-selected] &`]: {
    opacity: 1,
  },
});
const StyledItemText = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$1",
  p: 2,
  flex: 1,

  [`${ItemIcon} + &`]: {
    pl: 0,
  },
});
const ItemGrouping = styled("div", {
  text: "xs",
  color: "$gray8",
});
const ItemTitle = styled("div");

type ItemProps = Omit<
  React.ComponentProps<typeof StyledItem>,
  "children" | "title"
> & {
  grouping?: string;
  title: React.ReactNode;
  icon?: React.ReactNode;
};

export const Item = ({ grouping, title, icon, ...props }: ItemProps) => {
  return (
    <StyledItem {...props}>
      {icon && <ItemIcon>{icon}</ItemIcon>}
      <StyledItemText>
        {grouping && <ItemGrouping>{grouping}</ItemGrouping>}
        <ItemTitle>{title}</ItemTitle>
      </StyledItemText>
      <RightIcon>
        <ChevronRightIcon />
      </RightIcon>
    </StyledItem>
  );
};
