import { FwooshOptions } from "fwoosh";

import ReactPlugin from "@fwoosh/react";
import GitHubPlugin from "@fwoosh/tool-github";

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
  basename: "/fwoosh",
  docgen: { include: ["**/packages/components/**/*"] },
  sortSidebarItems: (a, b) => {
    // If both items are in the rootOrder array, sort by the order defined above
    if (rootOrder.includes(a.name) && rootOrder.includes(b.name)) {
      return rootOrder.indexOf(a.name) - rootOrder.indexOf(b.name);
    }
  },
  plugins: [
    "@fwoosh/panel-story-description",
    "@fwoosh/panel-props",
    "@fwoosh/panel-source",
    "@fwoosh/panel-actions",
    "@fwoosh/tool-zoom",
    "@fwoosh/tool-measure",
    new GitHubPlugin({ repo: "fwooshjs/fwoosh" }),
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
