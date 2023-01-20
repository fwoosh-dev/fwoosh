import React from "react";
import {
  Content,
  Sidebar,
  SidebarItem,
  SidebarItems,
  SidebarLayout,
  SidebarSectionTitle,
  Spinner,
} from "@fwoosh/components";
import { Outlet, Link } from "react-router-dom";
import { StoryTree } from "@fwoosh/types";
import { CONTENT_ID } from "@fwoosh/utils";
import { useDocsPath } from "@fwoosh/hooks";

import { DocsSidebarTree } from "./sidebar/DocsSidebarTree";
import { DocsToolbar } from "./DocsToolbar";

interface TreeItemProps {
  tree: StoryTree;
  path?: string[];
}

const TreeItem = ({ tree, path = [] }: TreeItemProps) => {
  const docsPath = useDocsPath();

  return (
    <>
      {Object.entries(tree).map(([title, items]) => {
        const currentPath = [...path, title];
        const pathString = currentPath.join("-");

        return (
          <React.Fragment key={`group-${pathString}`}>
            {Array.isArray(items) ? (
              <Link key={pathString} to={pathString}>
                <SidebarItem aria-selected={pathString === docsPath}>
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
      <DocsToolbar />
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
