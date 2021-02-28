import esbuild from "esbuild";
import { createProcessor } from "xdm";
export declare function onload(processor: ReturnType<typeof createProcessor>, data: esbuild.OnLoadArgs): Promise<esbuild.OnLoadResult>;
