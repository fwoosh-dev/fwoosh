declare module "@fwoosh/app/stories" {
  export interface Stories {
    [key: string]: {
      title: string;
      slug: string;
      code: string;
      grouping: string;
      component: any;
      comment?: string;
    };
  }

  export const stories: Stories;
}

declare module "@fwoosh/app/config" {
  import { FwooshOptions } from "../packages/cli/src/types";
  export const config: Pick<FwooshOptions, "title">;
}

declare module "@fwoosh/app/render" {
  export function render(id: string, slug: string): void;
}

declare module "@fwoosh/app/docs" {
  import type { ComponentDoc } from "react-docgen-typescript";
  export function useDocs(file?: string): ComponentDoc[];
}

declare module "@fwoosh/app/ui" {
  interface UiPlugin {
    ({ storyPreviewId: string }): JSX.Element;
    displayName: string;
  }

  export const toolbarControls: Array<UiPlugin>;
  export const panels: Array<UiPlugin>;
}
