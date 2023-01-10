interface ComponentOverridePluginOptions {
  componentOverrides?: string;
}

export const componentOverridePlugin = (
  options: ComponentOverridePluginOptions
) => {
  const virtualFileId = "@fwoosh/app/overrides";

  return {
    name: "component-overrides",

    resolveId(id: string) {
      if (id.includes(virtualFileId)) {
        return virtualFileId;
      }

      return null;
    },

    async load(id: string) {
      if (id.includes(virtualFileId)) {
        if (options.componentOverrides) {
          return `export * from "${options.componentOverrides}"`;
        }

        return "";
      }

      return;
    },
  };
};
