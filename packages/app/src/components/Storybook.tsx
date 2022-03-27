import React from "react";
import { Outlet, Link } from "react-router-dom";
import { StoryTree, useStoryTree } from "../hooks/useStoryTree";

const TreeItem = ({ tree }: { tree: StoryTree }) => {
  return (
    <>
      {Object.entries(tree).map(([title, items]) => {
        return (
          <>
            <span style={{ color: "grey" }}>{title}</span>
            {Array.isArray(items) ? (
              items.map((story) => (
                <Link key={story.slug} to={story.slug}>
                  {story.title}
                </Link>
              ))
            ) : (
              <TreeItem tree={items} />
            )}
          </>
        );
      })}
    </>
  );
};

export const Storybook = () => {
  const tree = useStoryTree();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr" }}>
      <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <TreeItem tree={tree} />
      </ul>
      <Outlet />
    </div>
  );
};
