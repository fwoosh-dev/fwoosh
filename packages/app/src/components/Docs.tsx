import {
  Content,
  Sidebar,
  SidebarItem,
  SidebarItems,
  SidebarLayout,
  SidebarTitle,
} from "@fwoosh/components";
import React from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import { StoryTree, useStoryTree } from "../hooks/useStoryTree";
import { ThemeToggle } from "./ThemeToggle";

interface TreeItemProps {
  tree: StoryTree;
  path?: string[];
}

const TreeItem = ({ tree, path = [] }: TreeItemProps) => {
  const params = useParams<{ docsPath: string }>();

  return (
    <>
      {Object.entries(tree).map(([title, items]) => {
        const currentPath = [...path, title];
        const pathString = currentPath.join("-");

        return (
          <React.Fragment key={`group-${pathString}`}>
            {Array.isArray(items) ? (
              <Link key={pathString} to={pathString}>
                <SidebarItem aria-selected={pathString === params.docsPath}>
                  {title}
                </SidebarItem>
              </Link>
            ) : (
              <>
                <SidebarTitle>{title}</SidebarTitle>
                <TreeItem tree={items} path={currentPath} />
              </>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export const Docs = () => {
  const tree = useStoryTree();

  return (
    <SidebarLayout>
      <Sidebar>
        <SidebarItems>
          <TreeItem tree={tree} />
        </SidebarItems>
      </Sidebar>
      <Content>
        <ThemeToggle />
        <Outlet />
      </Content>
    </SidebarLayout>
  );
};
