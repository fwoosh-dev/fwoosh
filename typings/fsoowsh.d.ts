declare module "@fwoosh/app/stories" {
  export interface BasicStoryData {
    title: string;
    slug: string;
    grouping: string;
    code: string;
    component: any;
    comment?: string;
    meta: StoryMeta;
  }

  export interface MDXStoryData {
    title: string;
    slug: string;
    grouping: string;
    meta: StoryMeta;
    component: any;
    mdxFile: any;
  }

  export type StoryData = BasicStoryData | MDXStoryData;

  export interface Stories {
    [key: string]: StoryData;
  }

  export const stories: Stories;
}

declare module "@fwoosh/app/config" {
  // import { FwooshOptions } from "fwoosh";
  export const config: Pick<FwooshOptions, "title">;
}

declare module "@fwoosh/app/render" {
  export function render(id: Element, slug: string): void;
}

declare module "@fwoosh/app/docs" {
  import type { ComponentDoc } from "react-docgen-typescript";
  // import { StoryMeta } from "fwoosh";
  export function useDocs(
    key: string,
    story: StoryMeta,
    meta: StoryMeta
  ): ComponentDoc[];
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

  import { BasicStoryData, MDXStoryData } from "@fwoosh/app/stories";

  export interface StoryTreeItem {
    story: BasicStoryData;
    id: string;
    name: string;
  }

  export interface MDXPageTreeItem {
    mdxFile: MDXStoryData;
    id: string;
    name: string;
  }

  export type StorySidebarChildItem =
    | StoryTree
    | StoryTreeItem
    | MDXPageTreeItem;

  export interface StoryTree {
    name: string;
    id: string;
    children: StorySidebarChildItem[];
  }

  export type StorySidebarItem = StoryTree | MDXPageTreeItem;
}
