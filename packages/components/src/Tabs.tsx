import * as TabsPrimitive from "@radix-ui/react-tabs";
import { styled } from "./stitches";

export const Root = styled(TabsPrimitive.Root, {
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

export const Trigger = styled(TabsPrimitive.Trigger, {
  p: 4,
  color: "$gray10",
  position: "relative",
  text: "xs",

  '&[data-state="active"]': {
    color: "$primary11",
  },
  '&[data-state="active"]:after': {
    content: "",
    position: "absolute",
    inset: 0,
    borderBottom: "4px solid $primary8",
  },
});

export const List = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: "flex",
  borderBottom: `1px solid $gray4`,
  overflow: "auto",
});

export const Content = styled(TabsPrimitive.Content, {
  flex: 1,
  overflow: "auto",
});
