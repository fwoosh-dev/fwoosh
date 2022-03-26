import type { FwooshHooks } from "./types";
interface WatchPagesOptions {
    port: number;
}
export interface FwooshOptions {
    /** Globs to match story files */
    stories: string[];
    /** the directory with the mdx pages */
    outDir: string;
    /** Plugins applied to this fwoosh instance, contains default plugins */
    plugins: Array<string | [name: string, options: Record<string, unknown>]>;
}
export declare class Fwoosh {
    /** User's fwoosh options */
    options: Required<FwooshOptions>;
    /** Places for plugins to "tap" to add to or modify fwoosh's functionality */
    hooks: FwooshHooks;
    constructor(options: FwooshOptions);
    loadPlugins: () => Promise<void>;
    /** Clean up all the output files */
    clean(): Promise<void>;
    /** Do a production build of the website */
    build(): Promise<void>;
    /** Start the development server */
    dev(options?: WatchPagesOptions): Promise<void>;
    private getAllPages;
}
/** A fwoosh plugin */
export interface Plugin {
    /** The name of the plugin */
    name: string;
    /** Hook into fwoosh */
    apply(fwoosh: Fwoosh): void;
}
export {};
