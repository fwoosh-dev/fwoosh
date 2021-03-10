import React from "react";
import { FrontMatter } from "fwoosh";

import NavBarLayout from "./nav-bar";

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
    <NavBarLayout>
      <div className="flex flex-col">
        <div className="w-full bg-blue-200 h-12 flex items-center px-3">
          {frontMatter.title} Blog
        </div>
        {children}
      </div>
    </NavBarLayout>
  );
};

export default BlogLayout;
