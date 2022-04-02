import { endent } from "./endent.js";
import { pascalCase } from "change-case";

/** Plugin that injects fwoosh config options into the front-end */
export function fwooshUiPlugin(controls: string[]) {
  const virtualFileId = "@fwoosh/app/ui";

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
        const lazyToolbarComponentNames: string[] = [];
        const lazyToolbarComponents = controls.map((control) => {
          const name = pascalCase(control);
          lazyToolbarComponentNames.push(name);

          return endent`
            const ${name} = React.lazy(() => import('${control}'));
            ${name}.displayName = '${name}';
          `;
        });

        return endent`
          import * as React from "react";

          ${lazyToolbarComponents.join("")}

          export const toolbarControls = [ ${lazyToolbarComponentNames.join(
            ", "
          )}];
        `;
      }
      return;
    },
  };
}
