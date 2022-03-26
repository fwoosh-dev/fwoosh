import findCacheDir from "find-cache-dir";

export const getCacheDir = () => findCacheDir({ name: "fwoosh" })!;
