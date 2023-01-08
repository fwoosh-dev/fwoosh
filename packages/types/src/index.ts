import { TocEntry } from "remark-mdx-toc";

export interface Story {
  exportName: string;
  title: string;
  slug: string;
  file: string;
  code: string;
  comment?: string;
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
