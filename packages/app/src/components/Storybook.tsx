import React from "react";
import {
  Content,
  SidebarItems,
  SidebarItem,
  SidebarLayout,
  SidebarSectionTitle,
  SidebarTitle,
  Sidebar,
  SidebarHeader,
} from "@fwoosh/components";
import { config } from "@fwoosh/app/config";
import { Outlet, Link, useParams } from "react-router-dom";
import { StoryTree, useStoryTree } from "../hooks/useStoryTree";
import { ThemeToggle } from "./ThemeToggle";

const TreeItem = ({ tree }: { tree: StoryTree }) => {
  const params = useParams<{ storyId: string }>();

  return (
    <>
      {Object.entries(tree).map(([title, items]) => {
        return (
          <React.Fragment key={title}>
            <SidebarSectionTitle>{title}</SidebarSectionTitle>
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
        <SidebarHeader>
          <SidebarTitle>{config.title}</SidebarTitle>
          <ThemeToggle />
        </SidebarHeader>
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
