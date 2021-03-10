import React from "react";
import { FrontMatter, LayoutContext } from "fwoosh";

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
  const { pages, currentPage } = React.useContext(LayoutContext);

  return (
    <div id="ignite" className="min-h-screen flex flex-col">
      <div className="w-full bg-red-200 h-12 flex items-center px-3">
        {currentPage}
      </div>
      {children}
    </div>
  );
};

export default NavBarLayout;
