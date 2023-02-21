import { InlineConfig } from "vite";
import {
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
  SyncWaterfallHook,
} from "tapable";
import type { ComponentDoc } from "react-docgen-typescript";
import { CreateStitches } from "@stitches/react";
import type { Theme } from "shiki";

export type { ComponentDoc } from "react-docgen-typescript";

export interface ParsedStoryData {
  /** The exported name of the story */
  exportName: string;
  /** A human readable title for the story */
  title: string;
  /** A unique identifier for the story */
  slug: string;
  /** The file where the story is defined */
  file: string;
  /** The code that defines the story */
  code: () => Promise<string>;
  /** The jsDoc comment above the story */
  comment?: () => Promise<string>;
}

export interface ResolvedStoryMeta extends StoryMeta {
  /** The file where the story is defined */
  file?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StoryParameters = Record<string, any>;

export interface StoryMeta<C extends FwooshOptions = FwooshOptions> {
  /** The title used to create the sidebar tree structure. */
  title: string;
  /** The component docs should be generated for */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any;
  /** Parameters for addons rendered with all the stories in the file */
  parameters?: ExtractParamsFromPlugins<C["plugins"][number]>;
}

interface BaseStoryData {
  title: string;
  slug: string;
  grouping: string;
  meta: StoryMeta | Promise<StoryMeta>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
}

export interface BasicStoryData extends BaseStoryData {
  type: "basic";
  code: () => Promise<string>;
  comment?: () => Promise<string>;
}

export interface MdxMeta {
  /** The title used to create the sidebar tree structure. */
  title: string;
  /** Hide the quick navigation for the page. */
  hideNav?: boolean;
  /** Render just the mdx without any wrapper */
  fullPage?: boolean;
  /** Don't create a search index for this page */
  skipIndex?: boolean;
}

export interface TocEntry {
  depth: number;
  value: string;
  attributes: Record<string, string>;
  children: TocEntry[];
}

export interface MDXStoryData extends BaseStoryData {
  type: "mdx";
  meta: MdxMeta;
}

export type StoryData = BasicStoryData | MDXStoryData;

export type Stories = Record<string, StoryData | undefined>;

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

interface UIPluginProps {
  hideWithoutParams?: boolean;
  hideInDocs?: boolean;
}

export interface FwooshTool extends UIPluginProps {
  name: string;
  filepath: string;
  paramKey?: string;
}

export type FwooshPanel = FwooshTool;

export interface FwooshToolbarButton extends FwooshTool {
  scope: "story" | "global";
}

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
   * Register a tool in the toolbar.
   *
   * It should add a path to the array of strings to the
   * The file should export a react component that acts as the toolbar control.
   */
  registerToolbarControl: SyncWaterfallHook<[FwooshToolbarButton[]]>;
  /**
   * Register a panel in the workbench.
   *
   * It should add a path + title to the array. The title is used
   * for the text of the Tab trigger.
   */
  registerPanel: SyncWaterfallHook<[FwooshPanel[]]>;
  /**
   * Modify the Vite configuration used to load your fwoosh instance.
   */
  modifyViteConfig: AsyncSeriesWaterfallHook<[ViteConfig]>;
}

export type Tokens = NonNullable<
  NonNullable<Parameters<CreateStitches>[0]>["theme"]
>;

export type SyntaxTheme = Theme;

export interface ThemeObject {
  tokens?: Tokens;
  /** A className to apply to the body when theme is active */
  class?: string;
  type: "light" | "dark";
}

export interface FwooshOptions {
  /** The title for the website */
  title?: string;
  /** A file that should be loaded for all stories. Typically used to import global CSS */
  setup?: string;
  /** Globs to match story files */
  stories?: string[];
  /** The directory to build the website into */
  outDir?: string;
  /** Open the browser when running the dev server */
  open?: "workbench" | "docs" | false;
  /** Plugins applied to this fwoosh instance, contains default plugins */
  plugins: (
    | string
    | [name: string, options: Record<string, unknown>]
    | Plugin
  )[];
  /** Modify the Vite configuration used to load your fwoosh instance. */
  modifyViteConfig?: (config: ViteConfig) => Promise<ViteConfig> | ViteConfig;
  /** Modify the sorting of items in the sidebar */
  sortSidebarItems?: (
    a: StorySidebarChildItem,
    b: StorySidebarChildItem
  ) => number | undefined;
  /** Customize the theme tokens used to render the website */
  theme?: string | ThemeObject | ThemeObject[];
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
  /** Theme to use for highlighting code */
  syntaxTheme?: SyntaxTheme;
}

export type FwooshOptionWithCLIDefaults = FwooshOptions &
  Required<Pick<FwooshOptions, "stories" | "outDir">>;

export type FwooshOptionsLoaded = Required<
  Omit<FwooshOptions, "theme" | "componentOverrides">
> &
  Pick<FwooshOptions, "componentOverrides"> & {
    themes?: ThemeObject[];
  } & {
    /** Modify the sorting of items in the sidebar */
    sortSidebarItems?: (
      a: StorySidebarChildItem,
      b: StorySidebarChildItem
    ) => number;
  };

export interface FwooshClass {
  /** User's fwoosh options */
  options: FwooshOptionsLoaded;
  /** Places for plugins to "tap" to add to or modify fwoosh's functionality */
  hooks: FwooshHooks;
}

/** A fwoosh plugin */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Plugin<Params = Record<string, any>> {
  /** The name of the plugin */
  name: string;
  /** Hook into fwoosh */
  apply(fwoosh: FwooshClass): void;
  /** Parameters the plugin can take. */
  params?: Params;
}

export interface PanelPluginProps {
  storyPreviewId: string;
  storyId: string;
}

export interface PanelPlugin extends UIPluginProps {
  (props: PanelPluginProps): JSX.Element;
  componentName: string;
  displayName: (props: PanelPluginProps) => JSX.Element;
  paramKey?: string;
}

export interface ToolbarPluginProps {
  storyPreviewId: string;
  storyId?: string;
}

export interface ToolbarPlugin extends UIPluginProps {
  (props: ToolbarPluginProps): JSX.Element;
  componentName: string;
  displayName: string;
  paramKey?: string;
  scope: "story" | "global";
}

export type ExtractParamsFromPlugins<
  T extends FwooshOptions["plugins"][number]
> =
  // plugin supplied as a string
  T extends string
    ? never
    : // plugin supplied as a tuple
    T extends unknown[]
    ? never
    : // plugin is a class and has params and a name
    T extends { params: infer U; name: infer N }
    ? // that name is a string
      N extends string
      ? // and the params are an object with the plugin's name as a key
        {
          [K in N]: U | false;
        }
      : never
    : never;
