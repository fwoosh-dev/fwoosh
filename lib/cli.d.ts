import esbuild from "esbuild";
export declare const build: (options: esbuild.BuildOptions) => Promise<esbuild.BuildResult>;
interface BuildWebsiteOptions {
    /** the directory with the mdx pages */
    dir: string;
    /** the directory with the mdx pages */
    outDir: string;
}
export declare const buildWebsite: (options: BuildWebsiteOptions) => Promise<void>;
export {};
