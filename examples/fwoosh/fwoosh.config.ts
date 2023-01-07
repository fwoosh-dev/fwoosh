import { FwooshOptions } from "fwoosh";
import ReactPlugin from "@fwoosh/react";

const rootOrder = [
  "Welcome",
  "Configuration",
  "Writing Stories",
  "CLI Reference",
  "Features",
  "Plugins",
  "Theming",
  "Plugin API",
  "Changelog",
];

export const config: FwooshOptions = {
  title: "Fwoosh",
  sortSidebarItems: (a, b) => {
    // Keep stories sorted by order they were defined
    if (a.type === "story" && b.type === "story") {
      return 0;
    }

    // If both items are in the rootOrder array, sort by the order defined above
    if (rootOrder.includes(a.name) && rootOrder.includes(b.name)) {
      return rootOrder.indexOf(a.name) - rootOrder.indexOf(b.name);
    }

    // Render stories/mdx before trees
    if (a.type === "tree" && (b.type === "story" || b.type === "mdx")) {
      return 1;
    }

    if (b.type === "tree" && (a.type === "story" || a.type === "mdx")) {
      return -1;
    }

    // Default to sorting by name
    return a.name.localeCompare(b.name);
  },
  plugins: [
    "@fwoosh/story-description-panel",
    "@fwoosh/props-panel",
    "@fwoosh/source-panel",
    "@fwoosh/actions",
    "@fwoosh/zoom",
    "@fwoosh/measure",
    new ReactPlugin({
      docgenOptions: {
        propFilter: (prop) => {
          return prop.parent
            ? !/@types\/react/.test(prop.parent.fileName) &&
                !/@emotion/.test(prop.parent.fileName)
            : true;
        },
      },
    }),
  ],
};
