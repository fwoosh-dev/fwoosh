import React from "react";
import { LayoutContext } from "fwoosh";

interface NavBarProps {
  /** The page content */
  children: React.ReactNode;
}

/** Make a  basic navbar page layout */
const NavBarLayout = ({
  children,
}: NavBarProps & React.PropsWithChildren<{}>) => {
  const { pages, currentPage } = React.useContext(LayoutContext);
  const sections = (pages as string[]).reduce(
    (all, page) => {
      if (page.includes("/")) {
        const folder = page.split("/")[0];

        if (!all.includes(folder)) {
          return [...all, folder];
        }
      }

      return all;
    },
    ["Docs"]
  );

  return (
    <div id="ignite" className="min-h-screen flex flex-col">
      <div className="w-full bg-red-200 h-12 flex items-center justify-between px-3">
        <div className="flex items-center">
          <div className="rounded-full bg-black h-8 w-8 mr-2" />
          <div className="font-bold">Simple</div>
        </div>

        <div className="flex items-center space-x-2">
          {sections.map((section) => (
            <a
              className="hover:bg-red-300 h-12 flex items-center justify-center px-3"
              href={
                section === "Docs" ? "/index.html" : `${section}/index.html`
              }
            >
              {section}
            </a>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
};

export default NavBarLayout;
