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
  docgen: { include: ["**/packages/components/**/*"] },
  sortSidebarItems: (a, b) => {
    // If both items are in the rootOrder array, sort by the order defined above
    if (rootOrder.includes(a.name) && rootOrder.includes(b.name)) {
      return rootOrder.indexOf(a.name) - rootOrder.indexOf(b.name);
    }

    // Keep stories sorted by order they were defined
    if (a.type === "story" && b.type === "story") {
      return 0;
    }

    // Render stories/mdx before trees
    if (a.type === "tree" && b.type === "story") {
      return 1;
    }

    if (b.type === "tree" && a.type === "story") {
      return -1;
    }

    // Default to sorting by name
    return a.name.localeCompare(b.name);
  },
  plugins: [
    "@fwoosh/panel-story-description",
    "@fwoosh/panel-props",
    "@fwoosh/panel-source",
    "@fwoosh/panel-actions",
    "@fwoosh/tool-zoom",
    "@fwoosh/tool-measure",
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
  modifyViteConfig: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.base = "/fwoosh/";
    }

    return config;
  },
};
