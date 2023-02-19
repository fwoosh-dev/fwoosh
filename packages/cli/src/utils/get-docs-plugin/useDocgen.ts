import { useQuery } from "react-query";
import { resolveStoryMeta, UnresolvedMeta, log } from "@fwoosh/utils";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Since we lazy load stories we need to wait for them to be loaded
// before we can get the docgen for them.
// This is a simple backoff function that will retry a test function
// until it passes or the number of attempts is reached.
async function backoff(attempts: number, test: () => boolean) {
  let i = 0;
  let delay = 100;

  for (i = 0; i < attempts; i++) {
    if (test()) {
      return;
    }

    log.log(`Waiting for story to load...`);
    await sleep(delay);
    delay *= 2;
  }

  throw new Error(`Story failed to load after ${i} attempts`);
}

export const useDocgen = (key: string, meta: UnresolvedMeta, story?: any) => {
  const { data } = useQuery(
    key,
    async () => {
      let storyDefinition: { component: any } | undefined;

      if (story?._payload?._status === -1) {
        const storyComponent = await story._payload._result();
        storyDefinition = storyComponent.default;
      } else {
        storyDefinition = story?._payload?._result?.default;
      }

      let component = storyDefinition?.component;

      if (!component) {
        const resolvedMeta = await resolveStoryMeta(meta);

        if (resolvedMeta?.component) {
          component = resolvedMeta.component;
        }
      }

      if (!component) {
        return;
      }

      const components = Array.isArray(component) ? component : [component];
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

      // In dev we generate props only as necessary to be quicker
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
