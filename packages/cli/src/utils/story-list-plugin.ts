import { pascalCase } from "change-case";

import { endent } from "./endent.js";
import { FwooshOptions, Story, StoryMeta } from "../types";
import { getStories } from "./get-stories.js";

type Config = { stories: Story[]; meta: StoryMeta }[];

const defaultListModule = endent`
  import { lazy } from "react";
  import * as React from "react";
  export const stories = {};
`;

function createVirtualFile(config: Config) {
  const allStories = config.flatMap((file) =>
    file.stories.map((s) => ({ ...s, grouping: file.meta.title }))
  );
  const lazyComponents = allStories.map(
    (story) => endent`
      const ${pascalCase(story.slug)} = lazy(() =>
        import('${story.file}').then((module) => {
          return { default: module['${story.exportName}'] };
        })
      );
    `
  );
  const storyMap = allStories.map(
    (story) => `'${story.slug}': {
      title: '${story.title}',
      slug: '${story.slug}',
      grouping: '${story.grouping}',
      comment: \`${story.comment}\`,
      code: \`${story.code}\`,
      component: ${pascalCase(story.slug)},
      meta: import('${story.file}').then((module) => module.meta)
    }`
  );

  return endent`
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
          console.log(e);
          return defaultListModule;
        }
      }
      return;
    },
  };
}
