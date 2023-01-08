import { loadVirtualFile } from "@fwoosh/virtual-file";
import { createRequire } from "module";

import { endent } from "../endent.js";

const require = createRequire(import.meta.url);

/** Generates a react hook that requests docs at runtime. */
export function getDocsPlugin({ port }: { port: number }) {
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
          !id.includes("node_modules/@fwoosh") &&
          !id.endsWith(".css.js") &&
          !id.includes(".stories.") &&
          (id.endsWith(".js") ||
            id.endsWith(".jsx") ||
            id.endsWith(".ts") ||
            id.endsWith(".tsx"))
        ) {
          return (
            src +
            "\n" +
            endent`
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
          `
          );
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
          return loadVirtualFile(require.resolve("./useDocs.js"), {
            GET_DOCS_PORT: port,
          });
        }
      },
    },
  ];
}
