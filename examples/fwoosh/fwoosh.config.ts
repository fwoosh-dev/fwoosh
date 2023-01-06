import { FwooshOptions } from "fwoosh";
import ReactPlugin from "@fwoosh/react";

export const config: FwooshOptions = {
  title: "Fwoosh Design System",
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
