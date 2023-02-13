import { pascalCase } from "change-case";
import chokidar from "chokidar";
import {
  ParsedStoryData,
  FwooshOptionsLoaded,
  MDXStoryData,
  BasicStoryData,
  Stories,
} from "@fwoosh/types";
import debounce from "lodash.debounce";
import { ViteDevServer } from "vite";
import { convertMetaTitleToUrlParam, log, sortTree } from "@fwoosh/utils";
import { loadVirtualFile } from "@fwoosh/virtual-file";
import { createRequire } from "module";

import { endent } from "../endent.js";
import { getStoryData, MDXFileDescriptor } from "../get-stories.js";
import { getStoryTree } from "./get-story-tree.js";

const require = createRequire(import.meta.url);

const defaultListModule = endent`
  import { lazy } from "react";
  import * as React from "react";
  export const stories = {};
`;

type StoryWithGrouping = ParsedStoryData & { grouping: string };

function stringifyStories(
  fileMap: Record<string, MDXStoryData | BasicStoryData>
) {
  return `{ ${Object.entries(fileMap)
    .map(([k, v]) => {
      return `"${k}": {
        ...${JSON.stringify(v)},
        component: ${v.component},
        code: \`${"code" in v ? v.code : undefined}\`,
        meta: ${v.meta}
      }`;
    })
    .join(",")} }`;
}

/** Creates an array of all the stories included in the fwoosh config */
export async function createVirtualStoriesFile(config: FwooshOptionsLoaded) {
  const stories = await getStoryData(config);
  const allFiles = stories.flatMap<MDXFileDescriptor | StoryWithGrouping>(
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

  const fileMap: Record<string, MDXStoryData | BasicStoryData> = {};
  const lazyComponents: string[] = [];

  for (const file of allFiles) {
    if ("mdxFile" in file) {
      const componentName = getComponentName(file.meta.title);
      const slug = convertMetaTitleToUrlParam(file.meta.title);

      lazyComponents.push(endent`
        const ${componentName} = lazy(() => import('${file.mdxFile}'));
      `);

      fileMap[slug] = {
        type: "mdx",
        title: file.meta.title,
        slug,
        grouping: file.meta.title,
        // @ts-ignore
        meta: JSON.stringify(file.meta),
        component: componentName, // todo this isn't a string
      };
    } else {
      const componentName = getComponentName(file.slug);

      lazyComponents.push(endent`
        const ${componentName} = lazy(() =>
          import('${file.file}').then((module) => {
            return { default: module['${file.exportName}'] };
          })
        );
      `);

      fileMap[file.slug] = {
        type: "basic",
        title: file.title,
        slug: file.slug,
        grouping: file.grouping,
        comment: file.comment,
        code: file.code,
        component: componentName,
        // @ts-ignore
        meta: `
          () => new Promise(resolve => {
            import('${file.file}')
              .then((module) => module.meta || module.default)
              .then(resolve)
          })
        `,
      };
    }
  }

  const tree = sortTree(
    getStoryTree(fileMap as Stories),
    config.sortSidebarItems
  );

  const file =
    endent`
    import { lazy } from "react";
    import * as React from "react";
    import { matchTreeSortingOrder } from "@fwoosh/utils";

    ${await loadVirtualFile(require.resolve("./get-story-tree.js"))}

    const order = ${
      // The sorting function is defined in node js so here we just
      // embed the order in the file.
      JSON.stringify(tree, (k, v) => {
        if (k === "code" || k === "meta" || k === "comment") {
          return undefined;
        }

        return v;
      })
    }

    ${lazyComponents.join("")}
  ` +
    `\nexport const stories = ${stringifyStories(fileMap)}` +
    `\nexport const tree = matchTreeSortingOrder(getStoryTree(stories), order);` +
    `\nexport const workbenchTree = matchTreeSortingOrder(getStoryTree(stories, { includeMDX: ${Boolean(
      config.includeMdxInWorkbench
    )} }), order);`;

  return { file, fileMap, tree };
}

/** Plugin that creates a virtual module with references to all the stories */
export function storyListPlugin(config: FwooshOptionsLoaded) {
  const virtualFileId = "@fwoosh/app/stories";
  let file = "";

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
          if (file) {
            return file;
          }

          const virtualFile = await createVirtualStoriesFile(config);
          return virtualFile.file;
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
        atomic: true,
        ignoreInitial: true,
      });

      const reload = (type: string) =>
        debounce(async (path: string) => {
          const mod = await server.moduleGraph.getModuleByUrl(virtualFileId);

          if (mod) {
            log.warn(`Reloading, story "${type}" detected:`, path);
            await server.reloadModule(mod);
          }
        }, 1000);

      storyWatcher.on("add", reload("add"));
      storyWatcher.on("change", reload("change"));
      storyWatcher.on("unlink", reload("unlink"));
    },
  };
}
