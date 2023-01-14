declare module "@fwoosh/app/stories" {
  import { Stories, StorySidebarChildItem } from "@fwoosh/types";
  export const stories: Stories;
  export const order: StorySidebarChildItem[];
  export const tree: StorySidebarChildItem[];
}

declare module "@fwoosh/app/overrides";

declare module "@fwoosh/app/config" {
  import { FwooshOptions, ThemeObject } from "@fwoosh/types";
  export const config: Pick<FwooshOptions, "title"> & {
    theme: ThemeObject;
  };
}

declare module "@fwoosh/app/render" {
  export function render(id: Element, slug: string): void;
}

declare module "@fwoosh/app/docs" {
  import type { ComponentDoc } from "react-docgen-typescript";
  import { StoryMeta } from "@fwoosh/types";
  export function useDocgen(key: string, story: StoryMeta): ComponentDoc[];
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
