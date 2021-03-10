import { AsyncSeriesBailHook, AsyncSeriesWaterfallHook } from "tapable";

export interface Asset {
  path: string;
  folder: string;
}

export interface Layout {
  /** The name of the layout */
  name: string;
  /** The path to the layout */
  path: string;
  /** The plugin that registered the layout */
  owner: string;
}

export interface FrontMatter {
  title: string;
  layout?: string;
  description?: string;
}

export interface LayoutMatchContext {
  /** The path to the page we're matching a layout to */
  path: string;
  /** The name of the layout to match */
  layout?: string;
  /** All of the registered layouts */
  layouts: Layout[];
}

export interface FwooshHooks {
  /** Add assets to the public directory. */
  addAssets: AsyncSeriesWaterfallHook<[Asset[]]>;
  /** Layout related hooks */
  layout: {
    /** Match a page to a layout */
    match: AsyncSeriesBailHook<LayoutMatchContext, Layout | void>;
    /** Add layouts for pages */
    register: AsyncSeriesWaterfallHook<[Layout[]]>;
  };
  /** Register files with component overrides */
  registerComponents: AsyncSeriesWaterfallHook<[string[]]>;
  /** Process the output html for server rendered pages */
  processPage: AsyncSeriesWaterfallHook<[string]>;
}
