import { pascalCase } from "change-case";
import {
  ParsedStoryData,
  FwooshOptionsLoaded,
  MDXStoryData,
  BasicStoryData,
  Stories,
} from "@fwoosh/types";
import { convertMetaTitleToUrlParam, sortTree } from "@fwoosh/utils";
import { loadVirtualFile } from "@fwoosh/virtual-file";
import { createRequire } from "module";

import { endent } from "../endent.js";
import {
  FwooshFileDescriptor,
  getStoryData,
  MDXFileDescriptor,
} from "../get-stories.js";
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
        code: ${"code" in v ? (v.code as unknown as string) : "''"},
        comment: ${"comment" in v ? (v.comment as unknown as string) : "''"},
        meta: ${v.meta as unknown as string}
      }`;
    })
    .join(",")} }`;
}

/** Creates an array of all the stories included in the fwoosh config */
export async function createVirtualStoriesFile(
  stories: FwooshFileDescriptor[],
  config: FwooshOptionsLoaded
) {
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error  // todo this isn't a string
        meta: JSON.stringify(file.meta),
        component: componentName,
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
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
    `\nexport const workbenchTree = matchTreeSortingOrder(getStoryTree(stories), order);`;

  return { file, fileMap, tree };
}

/** Plugin that creates a virtual module with references to all the stories */
export async function storyListPlugin(config: FwooshOptionsLoaded) {
  const virtualFileId = "@fwoosh/app/stories";
  const { data: stories, codeMap, commentMap } = await getStoryData(config);
  const virtualModules = [
    ...Object.entries(codeMap).map(([k, v]) => [
      `@fwoosh/code/${k}`,
      `export default \`${Buffer.from(v).toString("base64")}\``,
    ]),
    ...Object.entries(commentMap).map(([k, v]) => [
      `@fwoosh/comment/${k}`,
      v ? `export default \`${Buffer.from(v).toString("base64")}\`` : "",
    ]),
  ];

  return [
    ...virtualModules.map(([k, v]) => ({
      name: k,
      resolveId(id: string) {
        if (id.includes(k)) return k;
        return null;
      },
      async load(id: string) {
        if (id.includes(k)) return v;
        return;
      },
    })),
    {
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
            const virtualFile = await createVirtualStoriesFile(stories, config);
            return virtualFile.file;
          } catch (e) {
            console.error(e);
            return defaultListModule;
          }
        }
        return;
      },
    },
  ];
}
