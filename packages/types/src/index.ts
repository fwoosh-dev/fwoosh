import { TocEntry } from "remark-mdx-toc";
import { InlineConfig } from "vite";
import { AsyncSeriesBailHook, SyncBailHook, SyncWaterfallHook } from "tapable";
import type { ComponentDoc } from "react-docgen-typescript";
import { CreateStitches } from "@stitches/react";

export interface Story {
  /** The exported name of the story */
  exportName: string;
  /** A human readable title for the story */
  title: string;
  /** A unique identifier for the story */
  slug: string;
  /** The file where the story is defined */
  file: string;
  /** The code that defines the story */
  code: string;
  /** The jsDoc comment above the story */
  comment?: string;
}

export interface ResolvedStoryMeta extends StoryMeta {
  /** The file where the story is defined */
  file?: string;
}

export interface StoryMeta {
  /** The title used to create the sidebar tree structure. */
  title: string;
  /** The component docs should be generated for */
  component?: any;
}

interface BaseStoryData {
  title: string;
  slug: string;
  grouping: string;
  meta: StoryMeta;
  component: any;
}

export interface BasicStoryData extends BaseStoryData {
  type: "basic";
  code: string;
  comment?: string;
}

export interface MdxMeta {
  /** The title used to create the sidebar tree structure. */
  title: string;
  /** Hide the quick navigation for the page. */
  hideNav?: boolean;
}

export interface MDXStoryData extends BaseStoryData {
  type: "mdx";
  toc: TocEntry[];
  meta: MdxMeta;
}

export type StoryData = BasicStoryData | MDXStoryData;

export interface Stories {
  [key: string]: StoryData;
}

interface BaseTreeItem {
  id: string;
  name: string;
}

export interface StoryTreeItem extends BaseTreeItem {
  type: "story";
  story: BasicStoryData;
}

export interface MDXPageTreeItem extends BaseTreeItem {
  type: "mdx";
  story: MDXStoryData;
}

export type StorySidebarChildItem = StoryTree | StoryTreeItem | MDXPageTreeItem;

export interface StoryTree extends BaseTreeItem {
  type: "tree";
  children: StorySidebarChildItem[];
}

export type StorySidebarItem = StoryTree | MDXPageTreeItem;

type ViteConfig = Omit<InlineConfig, "mode" | "root">;

export interface FwooshHooks {
  /**
   * This hooks is what powers the main experience in fwoosh.
   * It is responsible for returning a function that is used to
   * render a story.
   *
   * It should return the contents of a virtual file that implements
   * rendering a story.
   */
  renderStory: AsyncSeriesBailHook<void, Promise<string>>;
  /**
   * This hook registers a function for documentation generation.
   * Given a file path it should return docs for all the components
   * in that file. That information is then consumed throughout the app.
   */
  generateDocs: SyncBailHook<string, ComponentDoc[]>;
  /**
   * Register a tool in the storybook toolbar.
   *
   * It should add a path to the array of strings to the
   * The file should export a react component that acts as the toolbar control.
   */
  registerToolbarControl: SyncWaterfallHook<[string[]]>;
  /**
   * Register a panel in the storybook panels.
   *
   * It should add a path + title to the array. The title is used
   * for the text of the Tab trigger.
   */
  registerPanel: SyncWaterfallHook<[{ name: string; filepath: string }[]]>;
}

export type Theme = NonNullable<
  NonNullable<Parameters<CreateStitches>[0]>["theme"]
>;

export type ThemeObject = {
  light: Theme;
  dark: Theme;
};

export interface FwooshOptions {
  /** The title for the storybook/docs */
  title?: string;
  /** A file that should be loaded for all stories. Typically used to import global CSS */
  setup?: string;
  /** Globs to match story files */
  stories?: string[];
  /** the directory with the mdx pages */
  outDir?: string;
  /** Open the browser when running the dev server */
  open?: "storybook" | "docs" | false;
  /** Plugins applied to this fwoosh instance, contains default plugins */
  plugins: Array<
    string | [name: string, options: Record<string, unknown>] | Plugin
  >;
  /** Modify the Vite configuration used to load your fwoosh instance. */
  modifyViteConfig?: (config: ViteConfig) => Promise<ViteConfig> | ViteConfig;
  /** Modify the sorting of items in the sidebar */
  sortSidebarItems?: (
    a: StorySidebarChildItem,
    b: StorySidebarChildItem
  ) => number;
  /** Customize the theme tokens used to render the website */
  theme?: string | ThemeObject;
}

export type FwooshOptionWithCLIDefaults = FwooshOptions &
  Required<Pick<FwooshOptions, "stories" | "outDir">>;

export type FwooshOptionsLoaded = Required<Omit<FwooshOptions, "theme">> & {
  theme?: ThemeObject;
};

export interface FwooshClass {
  /** User's fwoosh options */
  options: FwooshOptionsLoaded;
  /** Places for plugins to "tap" to add to or modify fwoosh's functionality */
  hooks: FwooshHooks;
}

/** A fwoosh plugin */
export interface Plugin {
  /** The name of the plugin */
  name: string;
  /** Hook into fwoosh */
  apply(fwoosh: FwooshClass): void;
}
