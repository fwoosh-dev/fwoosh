import {
  Content,
  Sidebar,
  SidebarItem,
  SidebarItems,
  SidebarLayout,
  SidebarHeader,
  SidebarTitle,
  SidebarSectionTitle,
} from "@fwoosh/components";
import { config } from "@fwoosh/app/config";
import React from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import { StoryTree, useStoryTree } from "../hooks/useStoryTree";
import { DocsSidebarTree } from "./sidebar/DocsSidebarTree";

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
                <SidebarSectionTitle>{title}</SidebarSectionTitle>
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
  return (
    <SidebarLayout>
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle>{config.title}</SidebarTitle>
        </SidebarHeader>
        <SidebarItems>
          <DocsSidebarTree />
        </SidebarItems>
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </SidebarLayout>
  );
};
