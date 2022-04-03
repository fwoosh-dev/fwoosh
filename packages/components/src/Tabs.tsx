import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { styled } from "./stitches";

export const Root = styled(TabsPrimitive.Root, {
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const Trigger = styled(TabsPrimitive.Trigger, {
  p: 4,
  color: "$gray10",
  position: "relative",

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
});
export const Content = TabsPrimitive.Content;
