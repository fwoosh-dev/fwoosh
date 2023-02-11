import { FwooshOptions } from "fwoosh";
import path from "path";

import ReactPlugin, { StoryMeta as ReactStoryMeta, Story } from "@fwoosh/react";
import DesignsPanel from "@fwoosh/panel-designs";
import ViewportTool from "@fwoosh/tool-viewport";
import PropsPanelPlugin from "@fwoosh/panel-props";
import SourcePanelPlugin from "@fwoosh/panel-source";
import ActionsPanelPlugin from "@fwoosh/panel-actions/plugin";
import ZoomPanelPlugin from "@fwoosh/tool-zoom";
import MeasurePanelPlugin from "@fwoosh/tool-measure";

export const config = {
  title: "@fwoosh/react",
  syntaxTheme: "material-ocean",
  setup: path.resolve("./config/fwoosh-setup.ts"),
  theme: path.resolve("./config/fwoosh-theme.ts"),
  componentOverrides: path.resolve("./config/fwoosh-overrides.tsx"),
  docgen: {
    include: ["**/src/**/*.{ts,tsx}"],
  },
  plugins: [
    new DesignsPanel({ hideWithoutParams: true }),
    new PropsPanelPlugin(),
    new SourcePanelPlugin(),
    new ActionsPanelPlugin(),
    new ZoomPanelPlugin(),
    new MeasurePanelPlugin(),
    new ViewportTool(),
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
} satisfies FwooshOptions;

declare global {
  type ReactMeta = ReactStoryMeta<typeof config>;
  type ReactStory = Story<ReactMeta>;
}
