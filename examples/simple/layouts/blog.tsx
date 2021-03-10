import React from "react";
import { FrontMatter } from "fwoosh";

interface BlogProps {
  /** The page content */
  children: React.ReactNode;
  frontMatter: FrontMatter;
}

/** Make a basic Blog page layout */
const BlogLayout = ({
  children,
  frontMatter,
}: BlogProps & React.PropsWithChildren<{}>) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full bg-blue-200 h-12 flex items-center px-3">
        {frontMatter.title} Blog
      </div>
      {children}
    </div>
  );
};

export default BlogLayout;
