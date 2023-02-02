import { FwooshOptions } from "fwoosh";
import path from "path";
import ReactPlugin from "@fwoosh/react";
import DesignsPanel from "@fwoosh/panel-designs";

export const config: FwooshOptions = {
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
    "@fwoosh/panel-props",
    "@fwoosh/panel-source",
    "@fwoosh/panel-actions",
    "@fwoosh/tool-zoom",
    "@fwoosh/tool-measure",
    "@fwoosh/tool-viewport",
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
