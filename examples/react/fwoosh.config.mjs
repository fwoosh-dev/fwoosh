import ReactPlugin from "@fwoosh/react";

export default {
  title: "@fwoosh/react",
  plugins: [
    "@fwoosh/zoom",
    "@fwoosh/props-panel",
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
