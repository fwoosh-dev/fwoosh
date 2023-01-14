import { ComponentDoc, FwooshOptions } from "@fwoosh/types";
import { log } from "@fwoosh/utils";
import { loadVirtualFile } from "@fwoosh/virtual-file";
import { createRequire } from "module";
import micromatch from "micromatch";

import { endent } from "../endent.js";
import { convertMarkdownToHtml } from "../get-stories.js";

const require = createRequire(import.meta.url);

/** Generates a react hook that requests docs at runtime. */
export function getDocsPlugin({
  port,
  generateDocs,
  include,
}: {
  include?: string[];
  port: number;
  generateDocs: (id: string) => Promise<ComponentDoc[]>;
}) {
  const virtualFileId = "@fwoosh/app/docs";

  return [
    {
      name: "inject-get-file",

      async transform(src: string, id: string) {
        const isIncluded = include
          ? ["!**/*.stories.*", ...include].every((glob) =>
              micromatch.isMatch(id, glob)
            )
          : !id.includes("vite") &&
            !id.includes("node_modules/@fwoosh") &&
            !id.endsWith(".css.js") &&
            !id.includes(".stories.") &&
            (id.endsWith(".js") ||
              id.endsWith(".jsx") ||
              id.endsWith(".ts") ||
              id.endsWith(".tsx"));

        if (isIncluded) {
          let docgen = "undefined";

          if (process.env.NODE_ENV === "production") {
            const docs = await generateDocs(
              id.replace("/dist/", "/src/").replace(".js", ".tsx")
            );
            const docsWithHtmlDescriptions = await Promise.all(
              docs.map(async (doc) => ({
                ...doc,
                description: await convertMarkdownToHtml(doc.description),
              }))
            );
            docgen = JSON.stringify(docsWithHtmlDescriptions);
          }

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
                  ex.fwoosh_docgen = ${JSON.stringify(docgen)};
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
          return loadVirtualFile(require.resolve("./useDocgen.js"), {
            GET_DOCS_PORT: port,
          });
        }
      },
    },
  ];
}
