import * as React from "react";
import { Tree, NodeRendererProps } from "react-arborist";
import {
  SidebarActiveDot,
  SidebarFolderOpenIndicator,
  SidebarItem,
  SidebarSectionTitle,
  SIDEBAR_ITEM_INDENT,
  styled,
} from "@fwoosh/components";
import useMeasure from "react-use-measure";
import { Link, useParams } from "react-router-dom";
import { stories } from "@fwoosh/app/stories";

import * as styles from "./SidebarTree.module.css";
import { useStoryTree, StoryTree } from "../../hooks/useStoryTree";
import { SidebarFolderOpenIndicatorWrapper } from "@fwoosh/components/src";

const Wrapper = styled("div", {
  height: "100%",
  width: "100%",
});

function Node({ node, style }: NodeRendererProps<StoryTree>) {
  const isValidPath = React.useMemo(() => {
    return Object.values(stories).some(
      (story) => story.grouping.replace(/\//g, "-") === node.data.id
    );
  }, [node.data.id]);
  const finalStyle = {
    ...style,
    paddingLeft: (style.paddingLeft as number) + SIDEBAR_ITEM_INDENT,
  };

  if (node.data.children.length === 0) {
    const isActive = node.data.id === node.tree.props.selection;

    return (
      <SidebarItem
        style={finalStyle}
        as={Link}
        to={node.data.id}
        aria-selected={isActive}
      >
        <SidebarFolderOpenIndicatorWrapper>
          {isActive && <SidebarActiveDot />}
        </SidebarFolderOpenIndicatorWrapper>
        {node.data.name}
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
        {node.data.name}
      </SidebarItem>
    );
  }

  return (
    <SidebarSectionTitle style={finalStyle} data-active={isChildActive}>
      <SidebarFolderOpenIndicator
        as="button"
        isOpen={node.isOpen}
        onClick={() => node.toggle()}
      />
      {node.data.name}
    </SidebarSectionTitle>
  );
}

export const DocsSidebarTree = () => {
  const params = useParams<{ docsPath: string }>();
  const tree = useStoryTree({ includeStories: false });
  const [ref, bounds] = useMeasure();

  return (
    <Wrapper ref={ref}>
      <Tree
        initialData={tree}
        selection={params.docsPath}
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
