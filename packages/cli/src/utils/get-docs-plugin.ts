import { endent } from "./endent.js";

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
