import { endent } from "./endent.js";

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
        if (!file) {
          return "";
        }

        return endent`
          import("${file}").then(mod => {
            if (mod.decorators) {
              window.__FWOOSH_DECORATORS__ = mod.decorators;
            }
          })

          import "${file}"
        `;
      }
      return;
    },
  };
}
