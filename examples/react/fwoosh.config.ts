import { FwooshOptions } from "fwoosh";
import path from "path";
import ReactPlugin from "@fwoosh/react";

export const config: FwooshOptions = {
  title: "@fwoosh/react",
  setup: path.resolve("./config/fwoosh-setup.ts"),
  plugins: [
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
};
