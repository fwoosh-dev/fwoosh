import { endent } from "./endent.js";

/** Generates a react hook that requests docs at runtime. */
export function getDocsPlugin() {
  const virtualFileId = "@fwoosh/app/docs";

  return {
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
    
          export const useDocs = (path) => {
            const [docs, setDocs] = React.useState();

            React.useEffect(() => {
              if (!path) {
                return;
              }

              const params = new URLSearchParams({ title: path.replace(/-/g, "/") });
              setDocs();

              fetch("/get-docs?" + params).then((res) => res.json()).then((data) => {
                setDocs(data);
              })
            }, [path]);

            return docs;
          };
        `;
      }
    },
  };
}
