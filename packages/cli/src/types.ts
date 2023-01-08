import { AsyncSeriesBailHook, SyncBailHook, SyncWaterfallHook } from "tapable";
import type { ComponentDoc } from "react-docgen-typescript";
import { InlineConfig } from "vite";
import { StorySidebarChildItem } from "@fwoosh/app/ui";
import { StoryMeta } from "@fwoosh/types";

import { Plugin } from "./fwoosh";

export interface ResolvedStoryMeta extends StoryMeta {
  /** The file where the story is defined */
  file?: string;
}

export interface FwooshHooks {
  renderStory: AsyncSeriesBailHook<void, Promise<string>>;
  generateDocs: SyncBailHook<string, ComponentDoc[]>;
  registerToolbarControl: SyncWaterfallHook<[string[]]>;
  registerPanel: SyncWaterfallHook<[{ name: string; filepath: string }[]]>;
}

type ViteConfig = Omit<InlineConfig, "mode" | "root">;

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

export type FwooshOptionsLoaded = Required<FwooshOptions>;
