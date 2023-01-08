import { FwooshOptions } from "@fwoosh/types";
import { endent } from "./endent.js";

/** Plugin that injects fwoosh config options into the front-end */
export function fwooshConfigPlugin(config: FwooshOptions) {
  const virtualFileId = "@fwoosh/app/config";

  return {
    name: "fwoosh-config",

    resolveId(id: string) {
      if (id.includes(virtualFileId)) {
        return virtualFileId;
      }

      return null;
    },

    async load(id: string) {
      if (id.includes(virtualFileId)) {
        return endent`
          export const config = {
            title: "${config.title}",
          }
        `;
      }
      return;
    },
  };
}
