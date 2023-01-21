import { FwooshOptions } from "fwoosh";

import ReactPlugin from "@fwoosh/react";
import GitHubPlugin from "@fwoosh/tool-github";
import { StorySidebarChildItem } from "@fwoosh/types";

const rootOrder = [
  "Welcome",
  "Configuration",
  "Writing Stories",
  "CLI Reference",
  "Canvas",
  "Features",
  "Plugins",
  "Theming",
  "Plugin API",
  "Changelog",
];

const nestedOrder = ["Introduction"];

function sortBasedOnOrder(
  a: StorySidebarChildItem,
  b: StorySidebarChildItem,
  order: string[]
) {
  // If both items are in the order array, sort by the order defined above
  if (order.includes(a.name) && order.includes(b.name)) {
    return order.indexOf(a.name) - order.indexOf(b.name);
  }

  if (order.includes(a.name) && !order.includes(b.name)) {
    return -1;
  }

  if (order.includes(b.name) && !order.includes(a.name)) {
    return 1;
  }
}

export const config: FwooshOptions = {
  title: "Fwoosh",
  basename: "/fwoosh",
  docgen: { include: ["**/packages/components/**/*"] },
  sortSidebarItems: (a, b) => {
    const rootSort = sortBasedOnOrder(a, b, rootOrder);

    if (typeof rootSort !== "undefined") {
      return rootSort;
    }

    const nestedSort = sortBasedOnOrder(a, b, nestedOrder);

    if (typeof nestedSort !== "undefined") {
      return nestedSort;
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
