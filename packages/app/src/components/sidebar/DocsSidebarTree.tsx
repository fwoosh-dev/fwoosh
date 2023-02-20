import * as React from "react";
import { NodeRendererProps } from "react-arborist";
import {
  SidebarActiveDot,
  SidebarFolderOpenIndicator,
  SidebarItem,
  SidebarSectionTitle,
  SIDEBAR_ITEM_INDENT,
  SidebarFolderOpenIndicatorWrapper,
} from "@fwoosh/components";
import { Link } from "react-router-dom";
import { stories, tree } from "@fwoosh/app/stories";
import { StorySidebarChildItem } from "@fwoosh/types";
import {
  resetContentScrollPosition,
  convertMetaTitleToUrlParam,
  filterOutStories,
} from "@fwoosh/utils";
import { useDocsPath } from "@fwoosh/hooks";
import { titleCase } from "title-case";

import { SidebarTree } from "./SidebarTree";
import { getFirstRenderableChild } from "../../hooks/getFirstRenderableChild";

function Node({ node, style }: NodeRendererProps<StorySidebarChildItem>) {
  const firstChildSlug = getFirstRenderableChild(node, {
    isWorkbench: false,
  });
  const name = titleCase(node.data.name);
  const isValidPath = React.useMemo(() => {
    return Object.values(stories).some(
      (story) =>
        story && convertMetaTitleToUrlParam(story.grouping) === node.data.id
    );
  }, [node.data.id]);
  const finalStyle = {
    ...style,
    paddingLeft: (style.paddingLeft as number) + SIDEBAR_ITEM_INDENT,
  };

  if (
    (node.data.type === "tree" && node.data.children.length === 0) ||
    (node.data.type === "story" && node.data.story.type === "mdx")
  ) {
    const isActive = node.data.id === node.tree.props.selection;

    return (
      <SidebarItem
        style={finalStyle}
        as={Link}
        to={node.data.id}
        aria-selected={isActive}
        onClick={resetContentScrollPosition}
      >
        <SidebarFolderOpenIndicatorWrapper>
          {isActive && <SidebarActiveDot />}
        </SidebarFolderOpenIndicatorWrapper>
        {name}
      </SidebarItem>
    );
  }

  const isChildActive = node.tree.props.selection?.includes(node.data.id);

  if (isValidPath) {
    return (
      <SidebarItem
        style={finalStyle}
        as={Link}
        to={node.data.id}
        data-active={isChildActive}
        onClick={resetContentScrollPosition}
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
      </SidebarItem>
    );
  }

  return (
    <SidebarSectionTitle
      style={finalStyle}
      data-active={isChildActive}
      as={Link}
      to={firstChildSlug}
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

export const DocsSidebarTree = () => {
  const docsPath = useDocsPath();

  return (
    <SidebarTree data={filterOutStories(tree)} activeId={docsPath}>
      {Node}
    </SidebarTree>
  );
};
