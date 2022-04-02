import React from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { styled } from "./stitches";

export const Root = styled(ToolbarPrimitive.Root, {
  display: "flex",
  gap: 2,
});

export const Button = ToolbarPrimitive.Button;
export const Separator = ToolbarPrimitive.Separator;
