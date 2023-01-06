import { pascalCase } from "change-case";
import chokidar from "chokidar";
import debounce from "lodash.debounce";

import { endent } from "./endent.js";
import { FwooshOptions, Story } from "../types";
import {
  FwooshFileDescriptor,
  getStoryData,
  MDXFileDescriptor,
} from "./get-stories.js";
import { ViteDevServer } from "vite";
import { convertMetaTitleToUrlParam, log } from "@fwoosh/utils";

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
      const slug = convertMetaTitleToUrlParam(file.meta.title);

      lazyComponents.push(endent`
        const ${componentName} = lazy(() => import('${file.mdxFile}'));
      `);

      fileMap.push(`'${slug}': {
        type: 'mdx',
        title: '${file.meta.title}',
        slug: '${slug}',
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
        type: 'basic',
        title: '${file.title}',
        slug: '${file.slug}',
        grouping: '${file.grouping}',
        comment: ${file.comment ? `\`${file.comment}\`` : "undefined"},
        code: \`${file.code}\`,
        component: ${componentName},
        meta: new Promise(resolve => {
          // PERF TODO: this happens multiple times
          import('${file.file}')
            .then((module) => module.meta || module.default)
            .then(resolve)
        })
      }`);
    }
  }

  const file =
    endent`
    import { lazy } from "react";
    import * as React from "react";

    ${lazyComponents.join("")}
  ` + `\nexport let stories = { ${fileMap} }`;

  return file;
}

/** Plugin that creates a virtual module with references to all the stories */
export function storyListPlugin(config: FwooshOptions) {
  const virtualFileId = "@fwoosh/app/stories";
  let file = "";

  async function generateFile() {
    const stories = await getStoryData(config);
    file = createVirtualFile(stories);
    return file;
  }

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

          return await generateFile();
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
            await generateFile();
            await server.reloadModule(mod);
          }
        }, 1000);

      storyWatcher.on("add", reload("add"));
      storyWatcher.on("change", reload("change"));
      storyWatcher.on("unlink", reload("unlink"));
    },
  };
}
