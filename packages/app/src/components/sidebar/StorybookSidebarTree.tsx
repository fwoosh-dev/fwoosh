import * as React from "react";
import { NodeRendererProps } from "react-arborist";
import {
  SidebarActiveDot,
  SidebarFolderOpenIndicator,
  SidebarFolderOpenIndicatorWrapper,
  SidebarItem,
  SidebarSectionTitle,
  SIDEBAR_ITEM_INDENT,
} from "@fwoosh/components";
import { NavLink, useParams } from "react-router-dom";
import { StorySidebarChildItem, StoryTreeItem } from "@fwoosh/app/ui";

import { useStoryTree, hasActiveChild } from "../../hooks/useStoryTree";
import { resetContentScrollPosition, SidebarTree } from "./SidebarTree";

function Node({ node, style }: NodeRendererProps<StorySidebarChildItem>) {
  const finalStyle = {
    ...style,
    paddingLeft: (style.paddingLeft as number) + SIDEBAR_ITEM_INDENT,
  };

  if (node.data.type === "story") {
    const slug = ((node.data as unknown) as StoryTreeItem).story.slug;
    const isActive = slug === node.tree.props.selection;

    return (
      <SidebarItem
        key={slug}
        style={finalStyle}
        aria-selected={isActive}
        as={NavLink}
        to={slug}
        onClick={resetContentScrollPosition}
      >
        <SidebarFolderOpenIndicatorWrapper>
          {isActive && <SidebarActiveDot />}
        </SidebarFolderOpenIndicatorWrapper>
        {node.data.name}
      </SidebarItem>
    );
  }

  const isChildActive =
    node.tree.props.selection && node.data.type === "tree"
      ? hasActiveChild(node.data, node.tree.props.selection)
      : false;

  return (
    <SidebarSectionTitle
      style={finalStyle}
      as="button"
      onClick={() => node.toggle()}
      data-active={isChildActive}
    >
      <SidebarFolderOpenIndicator isOpen={node.isOpen} />
      {node.data.name}
    </SidebarSectionTitle>
  );
}

export const StorybookSidebarTree = () => {
  const params = useParams<{ storyId: string }>();
  const tree = useStoryTree();

  return (
    <SidebarTree data={tree} activeId={params.storyId}>
      {Node}
    </SidebarTree>
  );
};
