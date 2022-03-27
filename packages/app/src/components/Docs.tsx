import React from "react";
import { stories } from "@fwoosh/app/stories";
import { Outlet, Link } from "react-router-dom";

export const Docs = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr" }}>
      <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {Object.values(stories).map((story) => (
          <Link key={story.slug} to={`/docs/${story.slug}`}>
            {story.title}
          </Link>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};
