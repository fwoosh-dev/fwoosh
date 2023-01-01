import * as React from "react";
import { Tree, NodeRendererProps } from "react-arborist";
import {
  SidebarActiveDot,
  SidebarFolderOpenIndicator,
  SidebarFolderOpenIndicatorWrapper,
  SidebarItem,
  SidebarSectionTitle,
  SIDEBAR_ITEM_INDENT,
  styled,
} from "@fwoosh/components";
import useMeasure from "react-use-measure";
import { Link, useParams } from "react-router-dom";

import * as styles from "./SidebarTree.module.css";
import {
  useStoryTree,
  StoryTree,
  StoryTreeItem,
  hasActiveChild,
} from "../../hooks/useStoryTree";

const Wrapper = styled("div", {
  height: "100%",
  widows: "100%",
});

function Node({ node, style }: NodeRendererProps<StoryTree>) {
  const finalStyle = {
    ...style,
    paddingLeft: (style.paddingLeft as number) + SIDEBAR_ITEM_INDENT,
  };

  if ("story" in node.data) {
    const slug = ((node.data as unknown) as StoryTreeItem).story.slug;
    const isActive = slug === node.tree.props.selection;

    return (
      <SidebarItem
        key={slug}
        style={finalStyle}
        aria-selected={isActive}
        as={Link}
        to={slug}
      >
        <SidebarFolderOpenIndicatorWrapper>
          {isActive && <SidebarActiveDot />}
        </SidebarFolderOpenIndicatorWrapper>
        {node.data.name}
      </SidebarItem>
    );
  }

  const isChildActive = node.tree.props.selection
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
  const [ref, bounds] = useMeasure();

  return (
    <Wrapper ref={ref}>
      <Tree
        initialData={tree}
        selection={params.storyId}
        rowHeight={(SidebarItem as any).height}
        width={bounds.width}
        height={bounds.height}
        indent={SIDEBAR_ITEM_INDENT}
        disableDrag={true}
        disableDrop={true}
        selectionFollowsFocus={true}
        rowClassName={styles.flex}
      >
        {Node}
      </Tree>
    </Wrapper>
  );
};
