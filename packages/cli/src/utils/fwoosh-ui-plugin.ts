import { endent } from "./endent.js";
import { pascalCase } from "change-case";
import { FwooshPanel, FwooshToolbarButton } from "@fwoosh/types";

function lazyLoadComponents(
  imports: {
    name?: string;
    filepath: string;
    paramKey?: string;
    scope?: "global" | "story";
    hideWithoutParams?: boolean;
  }[]
) {
  const names: string[] = [];
  const components = imports.map((i) => {
    const name = i.name ? i.name.replace(/ /g, "") : pascalCase(i.filepath);
    names.push(name);

    return endent`
      const ${name} = React.lazy(() => import('${i.filepath}').then(m => {
        if (m.Name) {
          m.default.panelTitle = m.Name;
        }
        return m;
      }));
      ${name}.componentName = '${name}';
      ${name}.displayName = React.lazy(() => import('${i.filepath}').then(m => {
        return { default: m.Name || (() => '${name}') };
      }));
      ${i.paramKey ? `${name}.paramKey = "${i.paramKey}";` : ""}
      ${i.hideWithoutParams ? `${name}.hideWithoutParams = true;` : ""}
      ${i.scope ? `${name}.scope = "${i.scope}";` : ""}
    `;
  });

  return { names, components };
}

/** Plugin that injects fwoosh config options into the front-end */
export function fwooshUiPlugin({
  panels,
  toolbarControls,
}: {
  panels: FwooshPanel[];
  toolbarControls: FwooshToolbarButton[];
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
        const toolbar = lazyLoadComponents(toolbarControls);
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
