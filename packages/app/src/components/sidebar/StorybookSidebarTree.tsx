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
import { Link, useParams } from "react-router-dom";
import { StorySidebarChildItem, StoryTreeItem } from "@fwoosh/types";
import { useStoryTree, hasActiveChild } from "@fwoosh/hooks";
import { titleCase } from "title-case";

import { SidebarTree } from "./SidebarTree";
import { resetContentScrollPosition } from "@fwoosh/utils";

function Node({ node, style }: NodeRendererProps<StorySidebarChildItem>) {
  const finalStyle = {
    ...style,
    paddingLeft: (style.paddingLeft as number) + SIDEBAR_ITEM_INDENT,
  };
  const name = titleCase(node.data.name);

  if (node.data.type === "story" || node.data.type === "mdx") {
    const slug = ((node.data as unknown) as StoryTreeItem).story.slug;
    const isActive = slug === node.tree.props.selection;

    return (
      <SidebarItem
        key={slug}
        style={finalStyle}
        aria-selected={isActive}
        as={Link}
        to={node.data.type === "mdx" ? `docs/${slug}` : slug}
        onClick={resetContentScrollPosition}
      >
        <SidebarFolderOpenIndicatorWrapper>
          {isActive && <SidebarActiveDot />}
        </SidebarFolderOpenIndicatorWrapper>
        {name}
      </SidebarItem>
    );
  }

  const isChildActive =
    node.tree.props.selection && node.data.type === "tree"
      ? hasActiveChild(node.data, node.tree.props.selection)
      : false;

  const firstChildSlug = React.useMemo(() => {
    let currentNode = node.next;

    while (currentNode?.next) {
      if (currentNode.data.type !== "tree") {
        break;
      }

      currentNode = currentNode.next;
    }

    if (!currentNode || currentNode.data.type === "tree") {
      return "";
    }

    return currentNode.data.type === "story"
      ? currentNode.data.story.slug
      : `docs/${currentNode.data.story.slug}`;
  }, []);

  return (
    <SidebarSectionTitle
      as={Link}
      to={firstChildSlug}
      style={finalStyle}
      data-active={isChildActive}
    >
      <SidebarFolderOpenIndicator
        as="button"
        isOpen={node.isOpen}
        onClick={(e) => {
          node.toggle();
          // Prevent parent link from navigating
          e.preventDefault();
        }}
      />
      {name}
    </SidebarSectionTitle>
  );
}

export const StorybookSidebarTree = () => {
  const params = useParams<{ storyId: string; docsPath: string }>();
  const tree = useStoryTree();

  return (
    <SidebarTree data={tree} activeId={params.storyId || params.docsPath}>
      {Node}
    </SidebarTree>
  );
};
