import * as React from "react";
import { SidebarItem, SIDEBAR_ITEM_INDENT, styled } from "@fwoosh/components";
import useMeasure from "react-use-measure";
import { Tree } from "react-arborist";
import { TreeProps } from "react-arborist/dist/types/tree-props";

import * as styles from "./SidebarTree.module.css";

const Wrapper = styled("div", {
  height: "100%",
  width: "100%",
});

interface SidebarProps<T> {
  activeId: string | undefined;
  children?: TreeProps<T>["children"];
  data?: TreeProps<T>["initialData"];
}

export function SidebarTree<T>({ activeId, children, data }: SidebarProps<T>) {
  const [ref, bounds] = useMeasure();

  return (
    <Wrapper ref={ref}>
      <Tree
        initialData={data}
        selection={activeId}
        rowHeight={(SidebarItem as any).height}
        width={bounds.width}
        height={bounds.height}
        indent={SIDEBAR_ITEM_INDENT}
        disableDrag={true}
        disableDrop={true}
        selectionFollowsFocus={true}
        rowClassName={styles.flex}
        padding={8}
      >
        {children}
      </Tree>
    </Wrapper>
  );
}
