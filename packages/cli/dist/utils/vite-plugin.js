import { pascalCase } from "change-case";
import { endent } from "./endent.js";
import { getStories } from "./get-stories.js";
const defaultListModule = endent `
  import { lazy } from "react";
  import * as React from "react";
  export const stories = {};
`;
function createVirtualFile(config) {
    const allStories = config.flatMap((file) => file.stories);
    const lazyComponents = allStories.map((story) => endent `
      const ${pascalCase(story.slug)} = lazy(() =>
        import('${story.file}').then((module) => {
          return { default: module['${story.exportName}'] };
        })
      );
    `);
    const storyMap = allStories.map((story) => `'${story.slug}': {
      title: '${story.title}',
      slug: '${story.slug}',
      component: ${pascalCase(story.slug)},
    }`);
    return endent `
      import { lazy } from "react";
      import * as React from "react";

      ${lazyComponents.join("")}

      export let stories = { ${storyMap} };

      if (import.meta.hot) {
        import.meta.hot.accept((mod) => {
          // TODO - figure out how to do this
          import.meta.hot.invalidate();
        });
      }
  `;
}
export function fwooshPlugin(config) {
    const virtualFileId = "@fwoosh/app/stories";
    return {
        name: "generated-list",
        resolveId(id) {
            if (id.includes(virtualFileId)) {
                return virtualFileId;
            }
            return null;
        },
        async load(id) {
            if (id.includes(virtualFileId)) {
                try {
                    const stories = await getStories(config);
                    return createVirtualFile(stories);
                }
                catch (e) {
                    console.log(e);
                    return defaultListModule;
                }
            }
            return;
        },
    };
}
