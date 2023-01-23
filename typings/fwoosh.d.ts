declare module "@fwoosh/app/stories" {
  import { Stories, StorySidebarChildItem } from "@fwoosh/types";
  export const stories: Stories;
  export const order: StorySidebarChildItem[];
  export const tree: StorySidebarChildItem[];
  export const workbenchTree: StorySidebarChildItem[];
}

declare module "@fwoosh/app/overrides";

declare module "@fwoosh/app/config" {
  import { FwooshOptions, ThemeObject } from "@fwoosh/types";
  export const config: Pick<
    FwooshOptions,
    "title" | "includeMdxInWorkbench"
  > & {
    theme: ThemeObject;
  };
}

declare module "@fwoosh/app/render" {
  import { StoryParameters } from "@fwoosh/types";

  export function render(
    id: Element,
    slug: string,
    params: StoryParameters,
    onStart?: () => void,
    onComplete?: () => void
  ): void;
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
    paramKey?: string;
    scope: "story" | "global";
    hideWithoutParams?: string | false;
  }
  interface PanelPlugin {
    ({ storyPreviewId: string }): JSX.Element;
    componentName: string;
    displayName: () => JSX.Element;
    paramKey?: string;
    hideWithoutParams?: string | false;
  }

  export const toolbarControls: Array<ToolbarPlugin>;
  export const panels: Array<PanelPlugin>;
}
