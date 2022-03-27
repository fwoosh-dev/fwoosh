export function renderStoryPlugin(renderFunction: string) {
  const virtualFileId = "@fwoosh/app/render";

  return {
    name: "render-story",

    resolveId(id: string) {
      if (id.includes(virtualFileId)) {
        return virtualFileId;
      }

      return null;
    },

    async load(id: string) {
      if (id.includes(virtualFileId)) {
        return renderFunction;
      }
    },
  };
}
