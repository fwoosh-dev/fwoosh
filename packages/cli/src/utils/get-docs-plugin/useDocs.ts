import { Story, StoryMeta } from "@fwoosh/types";
import { useQuery } from "react-query";

type UnresolvedMeta =
  | undefined
  | StoryMeta
  | Promise<StoryMeta>
  | (() => Promise<{ default?: StoryMeta }>);

function isStoryMeta(meta: UnresolvedMeta): meta is StoryMeta {
  return meta && "component" in meta && meta.component;
}

async function resolveComponents(meta: UnresolvedMeta) {
  let component;

  if (!meta) {
    return;
  }

  // Components declared on the meta
  if (isStoryMeta(meta)) {
    component = meta;
  }
  // Resolved lazy component
  else if (meta instanceof Promise) {
    const resolvedPromise = await meta;

    if (resolvedPromise.component) {
      component = resolvedPromise;
    }
  }
  // Unresolved lazy component
  else if (typeof meta === "function") {
    const resolvedPromise = await meta();

    if (resolvedPromise.default?.component) {
      component = resolvedPromise.default;
    }
  }

  return component;
}

export const useDocs = (key: string, story: Story) => {
  const { data } = useQuery(
    key,
    async () => {
      const component = await resolveComponents(story);

      if (!component?.component) {
        return;
      }

      const components = Array.isArray(component.component)
        ? component.component
        : [component.component];
      const displayedComponents = components.map((c) => c.displayName);
      const file = components[0].fwoosh_file;

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
