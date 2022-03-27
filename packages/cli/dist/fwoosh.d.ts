import type { FwooshHooks, FwooshOptions } from "./types";
interface WatchPagesOptions {
    port: number;
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
    dev({ port }?: WatchPagesOptions): Promise<void>;
}
/** A fwoosh plugin */
export interface Plugin {
    /** The name of the plugin */
    name: string;
    /** Hook into fwoosh */
    apply(fwoosh: Fwoosh): void;
}
export {};
