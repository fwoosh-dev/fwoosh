import { paramCase } from "change-case";

export function convertMetaTitleToUrlParam(title: string) {
  return title.replace(/\//g, "-");
}

export function createStorySlug(grouping: string, title: string) {
  return `${paramCase(grouping)}--${paramCase(title)}`;
}
