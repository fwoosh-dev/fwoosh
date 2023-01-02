import { pascalCase } from "change-case";
import chokidar from "chokidar";

import { endent } from "./endent.js";
import { FwooshOptions, Story } from "../types";
import {
  FwooshFileDescriptor,
  getStories,
  MDXFileDescriptor,
} from "./get-stories.js";
import { ViteDevServer } from "vite";

const defaultListModule = endent`
  import { lazy } from "react";
  import * as React from "react";
  export const stories = {};
`;

type StoryWithGrouping = Story & { grouping: string };

function createVirtualFile(config: FwooshFileDescriptor[]) {
  const allFiles = config.flatMap<MDXFileDescriptor | StoryWithGrouping>(
    (file) => {
      return "stories" in file
        ? file.stories.map((s) => ({
            ...s,
            grouping: file.meta.title,
          }))
        : [file];
    }
  );

  const lazyComponents = allFiles.map((story) => {
    if ("mdxFile" in story) {
      return endent`
        const ${pascalCase(story.meta.title)} = lazy(() =>
          import('${story.mdxFile}')
        );
      `;
    }

    return endent`
      const ${pascalCase(story.slug)} = lazy(() =>
        import('${story.file}').then((module) => {
          return { default: module['${story.exportName}'] };
        })
      );
    `;
  });
  const fileMap = allFiles.map((file) => {
    if ("grouping" in file) {
      return `'${file.slug}': {
        title: '${file.title}',
        slug: '${file.slug}',
        grouping: '${file.grouping}',
        comment: ${file.comment ? `\`${file.comment}\`` : "undefined"},
        code: \`${file.code}\`,
        component: ${file.file ? pascalCase(file.slug) : "undefined"},
        meta: import('${file.file}').then((module) => module.meta)
      }`;
    }

    return `'${file.meta.title}': {
      title: '${file.meta.title}',
      slug: '${file.meta.title}',
      grouping: '${file.meta.title}',
      meta: ${JSON.stringify(file.meta)},
      component: ${pascalCase(file.meta.title)},
    }`;
  });

  return endent`
      import { lazy } from "react";
      import * as React from "react";

      ${lazyComponents.join("")}

      export let stories = { ${fileMap} };

      if (import.meta.hot) {
        import.meta.hot.accept((mod) => {
          // TODO - figure out how to do this
          import.meta.hot.invalidate();
        });
      }
  `;
}

/** Plugin that creates a virtual module with references to all the stories */
export function storyListPlugin(config: FwooshOptions) {
  const virtualFileId = "@fwoosh/app/stories";

  return {
    name: "story-list",

    resolveId(id: string) {
      if (id.includes(virtualFileId)) {
        return virtualFileId;
      }

      return null;
    },

    async load(id: string) {
      if (id.includes(virtualFileId)) {
        try {
          const stories = await getStories(config);
          return createVirtualFile(stories);
        } catch (e) {
          console.error(e);
          return defaultListModule;
        }
      }
      return;
    },

    configureServer(server: ViteDevServer) {
      const storyWatcher = chokidar.watch(config.stories, {
        persistent: true,
        ignored: /node_modules/,
      });

      async function reload() {
        const mod = await server.moduleGraph.getModuleByUrl(virtualFileId);

        if (mod) {
          server.reloadModule(mod);
          server.ws.send({ type: "full-reload" });
        }
      }

      storyWatcher.on("add", reload);
      storyWatcher.on("unlink", reload);
    },
  };
}
