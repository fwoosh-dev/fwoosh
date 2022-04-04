declare module "@fwoosh/app/stories" {
  // import { StoryMeta } from "fwoosh";
  export interface Stories {
    [key: string]: {
      title: string;
      slug: string;
      code: string;
      grouping: string;
      component: any;
      comment?: string;
      meta: StoryMeta;
    };
  }

  export const stories: Stories;
}

declare module "@fwoosh/app/config" {
  // import { FwooshOptions } from "fwoosh";
  export const config: Pick<FwooshOptions, "title">;
}

declare module "@fwoosh/app/render" {
  export function render(id: string, slug: string): void;
}

declare module "@fwoosh/app/docs" {
  import type { ComponentDoc } from "react-docgen-typescript";
  // import { StoryMeta } from "fwoosh";
  export function useDocs(meta?: StoryMeta): ComponentDoc[];
}

declare module "@fwoosh/app/ui" {
  interface ToolbarPlugin {
    ({ storyPreviewId: string }): JSX.Element;
    componentName: string;
    displayName: string;
  }
  interface PanelPlugin {
    ({ storyPreviewId: string }): JSX.Element;
    componentName: string;
    displayName: () => JSX.Element;
  }

  export const toolbarControls: Array<ToolbarPlugin>;
  export const panels: Array<PanelPlugin>;
}
