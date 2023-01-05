/** Plugin that injects fwoosh config options into the front-end */
export function fwooshSetupPlugin({ file }: { file: string }) {
  const virtualFileId = "@fwoosh/app/setup";

  return {
    name: "fwoosh-setup",

    resolveId(id: string) {
      if (id.includes(virtualFileId)) {
        return virtualFileId;
      }

      return null;
    },

    async load(id: string) {
      if (id.includes(virtualFileId)) {
        return file ? `import "${file}"` : "";
      }
      return;
    },
  };
}
