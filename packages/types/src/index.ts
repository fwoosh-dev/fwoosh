import { InlineConfig } from "vite";
import {
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
  SyncWaterfallHook,
} from "tapable";
import type { ComponentDoc } from "react-docgen-typescript";
import { CreateStitches } from "@stitches/react";

export type { ComponentDoc } from "react-docgen-typescript";

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

export type StoryParameters = Record<string, any>;

export interface StoryMeta<P extends StoryParameters = StoryParameters> {
  /** The title used to create the sidebar tree structure. */
  title: string;
  /** The component docs should be generated for */
  component?: any;
  /** Parameters for addons rendered with all the stories in the file */
  parameters?: P;
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

export interface TocEntry {
  depth: number;
  value: string;
  attributes: {
    [key: string]: string;
  };
  children: TocEntry[];
}

export interface MDXStoryData extends BaseStoryData {
  type: "mdx";
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

export interface StoryBasicTreeItem extends BaseTreeItem {
  type: "story";
  story: BasicStoryData;
}

export interface StoryTreeItem extends BaseTreeItem {
  type: "story";
  story: BasicStoryData | MDXStoryData;
}

export type StorySidebarChildItem = StoryTree | StoryTreeItem;

export interface StoryTree extends BaseTreeItem {
  type: "tree";
  children: StorySidebarChildItem[];
}

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
  generateDocs: AsyncSeriesBailHook<string, ComponentDoc[]>;
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
  /**
   * Modify the Vite configuration used to load your fwoosh instance.
   */
  modifyViteConfig: AsyncSeriesWaterfallHook<[ViteConfig]>;
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
  /** Override any component from @fwoosh/components and take full control of the UI. */
  componentOverrides?: string;
  /**
   * Generate docs for only these files.
   * This is only needed during build time where we generate docs for all files.
   * During dev we only generate docs for the component that's being viewed.
   */
  docgen?: {
    /** Include globs */
    include?: string[];
  };
  /**
   * Base path to load assets from.
   * If you serve your website from a subdirectory you'll need to set this.
   *
   * @example
   *
   * // If you serve your website from https://example.com/docs
   * // You'll need to set this to "/docs"
   */
  basename?: string;
}

export type FwooshOptionWithCLIDefaults = FwooshOptions &
  Required<Pick<FwooshOptions, "stories" | "outDir">>;

export type FwooshOptionsLoaded = Required<
  Omit<FwooshOptions, "theme" | "componentOverrides">
> &
  Pick<FwooshOptions, "componentOverrides"> & {
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
