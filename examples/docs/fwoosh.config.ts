import { FwooshOptions } from "fwoosh";

import ReactPlugin, {
  StoryMeta as ReactStoryMeta,
  Story as ReactStory,
} from "@fwoosh/react";
import GitHubPlugin from "@fwoosh/tool-github";
import StoryDescriptionPanelPlugin from "@fwoosh/panel-story-description";
import PropsPanelPlugin from "@fwoosh/panel-props";
import SourcePanelPlugin from "@fwoosh/panel-source";
import ActionsPanelPlugin from "@fwoosh/panel-actions/plugin";
import ZoomPanelPlugin from "@fwoosh/tool-zoom";
import MeasurePanelPlugin from "@fwoosh/tool-measure";
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

export const config = {
  title: "Fwoosh",
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
    new StoryDescriptionPanelPlugin(),
    new PropsPanelPlugin(),
    new SourcePanelPlugin(),
    new ActionsPanelPlugin(),
    new ZoomPanelPlugin(),
    new MeasurePanelPlugin(),
    new GitHubPlugin({ repo: "fwoosh-dev/fwoosh" }),
    new ReactPlugin({
      docgenOptions: {
        propFilter: (prop) => {
          return prop.parent
            ? !prop.parent.fileName.includes("@types/react") &&
                !prop.parent.fileName.includes("@emotion")
            : true;
        },
      },
    }),
  ],
} satisfies FwooshOptions;

declare module "fwoosh" {
  type Meta = ReactStoryMeta<typeof config>;
  type Story = ReactStory<Meta>;
}
