import React from "react";
import { FrontMatter } from "fwoosh";

interface NavBarProps {
  /** The page content */
  children: React.ReactNode;
  frontMatter: FrontMatter;
}

/** Make a  basic navbar page layout */
const NavBarLayout = ({
  children,
  frontMatter,
}: NavBarProps & React.PropsWithChildren<{}>) => {
  return (
    <div
      id="ignite"
      className="min-h-screen flex flex-col bg-white dark:bg-gray-1000"
    >
      <div className="w-full bg-red-200 h-12 flex items-center px-3">
        {frontMatter.layout}
      </div>
      {children}
    </div>
  );
};

export default NavBarLayout;
