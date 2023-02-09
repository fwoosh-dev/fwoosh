import { Story } from "@fwoosh/types";
import { useQuery } from "react-query";
import { resolveStoryMeta } from "@fwoosh/utils";

export const useDocgen = (key: string, story: Story) => {
  const { data } = useQuery(
    key,
    async () => {
      const component = await resolveStoryMeta(story);

      if (!component?.component) {
        return;
      }

      const components = Array.isArray(component.component)
        ? component.component
        : [component.component];
      const displayedComponents = components.map((c) => c.displayName);
      const file = components[0].fwoosh_file;

      // In prod the docgen will be inlined into the component
      if (
        components[0].fwoosh_docgen &&
        components[0].fwoosh_docgen !== "undefined"
      ) {
        const docgen = JSON.parse(components[0].fwoosh_docgen);
        return docgen.filter((doc: { displayName: string }) =>
          displayedComponents.includes(doc.displayName)
        );
      }

      // In dev we generate props only as necassary to be quicker
      return new Promise((resolve) => {
        const socket = new WebSocket(
          "ws://localhost:process.env.GET_DOCS_PORT/get-docs"
        );

        socket.addEventListener("open", () => {
          socket.send(file);
        });

        socket.addEventListener("message", (event) => {
          resolve(
            JSON.parse(event.data).filter((doc: { displayName: string }) =>
              displayedComponents.includes(doc.displayName)
            )
          );
        });
      });
    },
    { suspense: true }
  );

  return data;
};
