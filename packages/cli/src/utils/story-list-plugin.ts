import { pascalCase } from "change-case";
import chokidar from "chokidar";
import ms from "pretty-ms";

import { endent } from "./endent.js";
import { FwooshOptions, Story } from "../types";
import {
  FwooshFileDescriptor,
  getStories,
  MDXFileDescriptor,
} from "./get-stories.js";
import { ViteDevServer } from "vite";
import { log } from "@fwoosh/utils";

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

  const usedComponentNames = new Set<string>();

  function getComponentName(title: string) {
    let name = pascalCase(title);

    if (usedComponentNames.has(name)) {
      let i = 1;
      while (usedComponentNames.has(name + i)) {
        i++;
      }
      name = name + i;
    }

    usedComponentNames.add(name);

    return name;
  }

  const fileMap: string[] = [];
  const lazyComponents: string[] = [];

  for (const file of allFiles) {
    if ("mdxFile" in file) {
      const componentName = getComponentName(file.meta.title);

      lazyComponents.push(endent`
        const ${componentName} = lazy(() => import('${file.mdxFile}'));
      `);

      fileMap.push(`'${file.meta.title}': {
        title: '${file.meta.title}',
        slug: '${file.meta.title}',
        grouping: '${file.meta.title}',
        meta: ${JSON.stringify(file.meta)},
        component: ${componentName},
      }`);
    } else {
      const componentName = getComponentName(file.slug);

      lazyComponents.push(endent`
        const ${componentName} = lazy(() =>
          import('${file.file}').then((module) => {
            return { default: module['${file.exportName}'] };
          })
        );
      `);

      fileMap.push(`'${file.slug}': {
        title: '${file.title}',
        slug: '${file.slug}',
        grouping: '${file.grouping}',
        comment: ${file.comment ? `\`${file.comment}\`` : "undefined"},
        code: \`${file.code}\`,
        component: ${componentName},
        meta: import('${
          file.file
        }').then((module) => module.meta || module.default)
      }`);
    }
  }

  return endent`
    import { lazy } from "react";
    import * as React from "react";

    ${lazyComponents.join("")}

    export let stories = { ${fileMap} };
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

      async function reload(path: string) {
        const mod = await server.moduleGraph.getModuleByUrl(virtualFileId);

        if (mod) {
          log.info("Reloading, changes detected in stories:", path);
          server.reloadModule(mod);
        }
      }

      storyWatcher.on("add", reload);
      storyWatcher.on("change", reload);
      storyWatcher.on("unlink", reload);
    },
  };
}
