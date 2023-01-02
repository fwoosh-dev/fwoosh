import * as React from "react";
import { styled } from "./stitches";

export const SidebarItems = styled("ul", {
  height: "100%",
  width: "100%",
});

export const SidebarItem = styled("li", {
  height: "$8",
  px: 2,
  display: "flex",
  alignItems: "center",
  color: "$gray9",
  width: "100%",
  text: "xs",

  "&:hover": {
    backgroundColor: "$gray2",
  },

  '&[aria-selected="true"],&[data-active="true"]': {
    color: "$gray11",
    fontWeight: 500,
  },
});

(SidebarItem as any).height = 32;

export const SidebarSectionTitle = styled(SidebarItem, {
  color: "$gray8",
});

export const SidebarLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "280px 1fr",
  height: "calc(100vh - $14)",
});

export const Sidebar = styled("div", {
  borderRight: "1px solid $gray4",
  minHeight: 0,
  height: "100%",
  overflow: "auto",
});

export const SIDEBAR_ITEM_INDENT = 16;

export const SidebarFolderOpenIndicatorWrapper = styled("div", {
  height: 16,
  width: 16,
  marginRight: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const SidebarFolderOpenIndicatorIcon = styled("div", {
  backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m9 18 6-6-6-6' stroke='currentColor'/%3e%3c/svg%3e")`,
  backgroundPosition: "center",
  height: 6,
  width: 6,
  transformOrigin: "center",

  '[data-color-mode="dark"] &': {
    filter: "invert(1)",
  },
});

export const SidebarFolderOpenIndicator = ({
  isOpen,
  as,
  ...props
}: { isOpen: boolean; as?: keyof JSX.IntrinsicElements } & React.ComponentProps<
  typeof SidebarFolderOpenIndicatorWrapper
>) => (
  <SidebarFolderOpenIndicatorWrapper as={as} {...props}>
    <SidebarFolderOpenIndicatorIcon
      style={{
        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
      }}
    />
  </SidebarFolderOpenIndicatorWrapper>
);

export const SidebarActiveDot = styled("div", {
  height: "$1",
  width: "$1",
  backgroundColor: "$gray11",
  borderRadius: "100%",
});
