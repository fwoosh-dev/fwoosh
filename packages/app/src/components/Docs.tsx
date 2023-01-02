import {
  Content,
  Sidebar,
  SidebarItem,
  SidebarItems,
  SidebarLayout,
  HeaderBar,
  HeaderTitle,
  SidebarSectionTitle,
  styled,
  Spinner,
} from "@fwoosh/components";
import { config } from "@fwoosh/app/config";
import React from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import { StoryTree } from "@fwoosh/app/ui";

import { DocsSidebarTree } from "./sidebar/DocsSidebarTree";
import { ThemeToggle } from "./ThemeToggle";
import { CONTENT_ID } from "../constants";

interface TreeItemProps {
  tree: StoryTree;
  path?: string[];
}

const Split = styled("div", {
  flex: 1,
});

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
    <>
      <HeaderBar>
        <HeaderTitle>{config.title}</HeaderTitle>
        <Split />
        <ThemeToggle />
      </HeaderBar>
      <SidebarLayout>
        <Sidebar>
          <SidebarItems>
            <React.Suspense fallback={<Spinner delay={2000} />}>
              <DocsSidebarTree />
            </React.Suspense>
          </SidebarItems>
        </Sidebar>
        <Content id={CONTENT_ID}>
          <Outlet />
        </Content>
      </SidebarLayout>
    </>
  );
};
