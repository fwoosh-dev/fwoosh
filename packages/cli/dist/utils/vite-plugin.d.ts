import { FwooshOptions } from "../types";
export declare function fwooshPlugin(config: FwooshOptions): {
    name: string;
    resolveId(id: string): "@fwoosh/app/stories" | null;
    load(id: string): Promise<string | undefined>;
};
