import { paramCase } from "change-case";
import { Stories, StorySidebarChildItem } from "@fwoosh/types";
import { getFirstStory, getStoryGroup } from "./stories.js";

export function convertMetaTitleToUrlParam(title: string) {
  return title.replace(/\//g, "-");
}

export function createStorySlug(grouping: string, title: string) {
  return `${paramCase(grouping)}--${paramCase(title)}`;
}

function convertToDocSlug(to: string) {
  return to.replace(/\//g, "-");
}

function convertToStorySlug(to: string) {
  return (
    to
      // Replace the last / with two --
      .replace(/(\/)([^/]*)$/g, (_, __, storyName) => {
        // and param case the story name
        return `--${paramCase(storyName)}`;
      })
      // Replace remaining / with -
      .replace(/\//g, "-")
      .toLowerCase()
  );
}

export function checkLink(
  to: string | undefined,
  stories: Stories,
  tree: StorySidebarChildItem[]
) {
  if (!to) {
    throw new Error('Link "to" prop is required');
  }

  if (typeof to !== "string") {
    throw new Error('Link "to" prop must be a string');
  }

  const [pathname] = to.split("#");
  const storySlug = convertToStorySlug(pathname);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (stories[storySlug]) {
    return stories[storySlug];
  }

  const docSlug = convertToDocSlug(pathname);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (stories[docSlug]) {
    return stories[docSlug];
  }

  // If we're linking to a StoryMDX in the docs/ we need to convert
  // that to a docs path with a hash to the first story.
  //
  // StoryMDX doesn't exist in stories since it a set of stories and has
  // no direct representation.
  const parts = pathname.split("/");
  const group = getStoryGroup(tree, parts);

  if (group?.[0]) {
    const firstStory = getFirstStory(group);

    if (firstStory) {
      return firstStory;
    }
  }

  throw new Error(`Invalid link to: ${to}`);
}
