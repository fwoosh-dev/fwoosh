import { endent } from "./endent.js";

/** Generates a react hook that requests docs at runtime. */
export function getDocsPlugin() {
  const virtualFileId = "@fwoosh/app/docs";

  return [
    {
      name: "inject-get-file",

      resolveId(id: string) {
        if (id.includes(virtualFileId)) {
          return virtualFileId;
        }

        return null;
      },

      transform(src: string, id: string) {
        if (
          !id.includes("vite") &&
          !id.includes(".stories.") &&
          (id.endsWith(".js") ||
            id.endsWith(".jsx") ||
            id.endsWith(".ts") ||
            id.endsWith(".tsx"))
        ) {
          return endent`
            ${src}
          
            import * as currentModule from "${id}";
            let fwoosh_visited = [];

            function fwoosh_traverseExports(obj) {
              Object.entries(obj).forEach(([name, ex]) => {
                if (
                  typeof ex === "function" ||
                  (ex != undefined && typeof ex === "object" && "render" in ex)
                ) {
                  ex.fwoosh_file = "${id}";
                  ex.displayName = name;
                } else if (
                  typeof ex === "object" && ex !== null && 
                  Object.values(ex).length > 0 && 
                  !fwoosh_visited.includes(ex)
                ) {
                  fwoosh_visited.push(ex);
                  fwoosh_traverseExports(ex);
                }
              });
            }

            fwoosh_traverseExports(currentModule);
          `;
        }

        return src;
      },
    },
    {
      name: "get-docs",

      resolveId(id: string) {
        if (id.includes(virtualFileId)) {
          return virtualFileId;
        }

        return null;
      },

      async load(id: string) {
        if (id.includes(virtualFileId)) {
          return endent`
            import { lazy } from "react";
            import * as React from "react";
            import { useQuery } from "react-query";
            
            export const useDocs = (key, meta) => {
              const { data } = useQuery(
                key,
                async () => {
                  if (!meta) {
                    return;
                  }
            
                  const resolvedMeta = meta.then
                    ? await meta
                    : meta.component
                    ? meta
                    : (await meta()).default;
            
                  if (!resolvedMeta?.component) {
                    return;
                  }
            
                  const components = Array.isArray(resolvedMeta.component)
                    ? resolvedMeta.component
                    : [resolvedMeta.component];
                  const displayedComponents = components.map((c) => c.displayName);
                  const file = components[0].fwoosh_file;
                  const params = new URLSearchParams({ file });
                  const res = await fetch("/get-docs?" + params);
                  const data = await res.json();
            
                  return data.filter((doc) =>
                    displayedComponents.includes(doc.displayName)
                  );
                },
                { suspense: true }
              );

              return data;
            };
          `;
        }
      },
    },
  ];
}
