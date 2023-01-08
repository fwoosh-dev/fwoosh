import { TocEntry } from "remark-mdx-toc";
import { InlineConfig } from "vite";
import { AsyncSeriesBailHook, SyncBailHook, SyncWaterfallHook } from "tapable";
import type { ComponentDoc } from "react-docgen-typescript";

export interface Story {
  exportName: string;
  title: string;
  slug: string;
  file: string;
  code: string;
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
  renderStory: AsyncSeriesBailHook<void, Promise<string>>;
  generateDocs: SyncBailHook<string, ComponentDoc[]>;
  registerToolbarControl: SyncWaterfallHook<[string[]]>;
  registerPanel: SyncWaterfallHook<[{ name: string; filepath: string }[]]>;
}

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
}

export type FwooshOptionWithCLIDefaults = FwooshOptions &
  Required<Pick<FwooshOptions, "stories" | "outDir">>;

export type FwooshOptionsLoaded = Required<FwooshOptions>;

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
