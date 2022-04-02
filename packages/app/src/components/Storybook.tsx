import React from "react";
import {
  Content,
  SidebarItems,
  SidebarItem,
  SidebarLayout,
  SidebarTitle,
  Sidebar,
} from "@fwoosh/components";
import { Outlet, Link, useParams } from "react-router-dom";
import { StoryTree, useStoryTree } from "../hooks/useStoryTree";

const TreeItem = ({ tree }: { tree: StoryTree }) => {
  const params = useParams<{ storyId: string }>();

  return (
    <>
      {Object.entries(tree).map(([title, items]) => {
        return (
          <React.Fragment key={title}>
            <SidebarTitle>{title}</SidebarTitle>
            {Array.isArray(items) ? (
              items.map((story) => (
                <Link key={story.slug} to={story.slug}>
                  <SidebarItem aria-selected={story.slug === params.storyId}>
                    {story.title}
                  </SidebarItem>
                </Link>
              ))
            ) : (
              <TreeItem tree={items} />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export const Storybook = () => {
  const tree = useStoryTree();

  return (
    <SidebarLayout>
      <Sidebar>
        <SidebarItems>
          <TreeItem tree={tree} />
        </SidebarItems>
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </SidebarLayout>
  );
};
