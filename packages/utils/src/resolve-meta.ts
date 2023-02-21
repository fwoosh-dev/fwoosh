import { StoryMeta } from "@fwoosh/types";

export type UnresolvedMeta =
  | undefined
  | StoryMeta
  | Promise<StoryMeta>
  | (() => Promise<{ default?: StoryMeta }>);

function isStoryMeta(meta: UnresolvedMeta): meta is StoryMeta {
  return Boolean(meta && "title" in meta && meta.title);
}

export async function resolveStoryMeta(meta: UnresolvedMeta) {
  if (!meta) {
    return;
  }

  if (isStoryMeta(meta)) {
    return meta;
  }

  if (meta instanceof Promise) {
    return meta;
  }

  if (typeof meta === "function") {
    const resolvedPromise = await meta();
    return resolvedPromise.default ?? (resolvedPromise as StoryMeta);
  }
}
