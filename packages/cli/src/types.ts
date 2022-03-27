import { AsyncSeriesBailHook, SyncBailHook } from "tapable";
import type { ComponentDoc } from "react-docgen-typescript";
import { Plugin } from "./fwoosh";

export interface StoryMeta {
  /** The title used to create the sidebar tree structure. */
  title: string;
  /** The component docs should be generated for */
  component?: any;
}

export interface ResolvedStoryMeta extends StoryMeta {
  /** The file where the story is defined */
  file: string;
}

export interface Story {
  exportName: string;
  title: string;
  slug: string;
  file: string;
  comment?: string;
}

export interface FwooshHooks {
  renderStory: SyncBailHook<void, string>;
  generateDocs: SyncBailHook<string, ComponentDoc[]>;
}

export interface FwooshOptions {
  /** Globs to match story files */
  stories: string[];
  /** the directory with the mdx pages */
  outDir: string;
  /** Plugins applied to this fwoosh instance, contains default plugins */
  plugins: Array<
    string | [name: string, options: Record<string, unknown>] | Plugin
  >;
}
