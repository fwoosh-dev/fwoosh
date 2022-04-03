import { endent } from "./endent.js";
import { pascalCase } from "change-case";

function lazyLoadComponents(imports: { name?: string; filepath: string }[]) {
  const names: string[] = [];
  const components = imports.map((i) => {
    const name = i.name || pascalCase(i.filepath);
    names.push(name);

    return endent`
      const ${name} = React.lazy(() => import('${i.filepath}'));
      ${name}.displayName = '${name}';
    `;
  });

  return { names, components };
}

/** Plugin that injects fwoosh config options into the front-end */
export function fwooshUiPlugin({
  panels,
  toolbarControls,
}: {
  panels: { name: string; filepath: string }[];
  toolbarControls: string[];
}) {
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
        const toolbar = lazyLoadComponents(
          toolbarControls.map((filepath) => ({ filepath }))
        );
        const panel = lazyLoadComponents(panels);

        return endent`
          import * as React from "react";

          ${toolbar.components.join("")}
          export const toolbarControls = [ ${toolbar.names.join(", ")}];

          ${panel.components.join("")}
          export const panels = [ ${panel.names.join(", ")}];
        `;
      }
      return;
    },
  };
}
