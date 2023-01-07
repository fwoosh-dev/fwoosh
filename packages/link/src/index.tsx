import * as React from "react";
import { paramCase } from "change-case";
import { getFirstStory, getStoryGroup, useStoryTree } from "@fwoosh/hooks";
import { components } from "@fwoosh/components";
import { stories } from "@fwoosh/app/stories";
import { useLocation } from "react-router-dom";

function convertToDocSlug(to: string) {
  return to.replace(/\//g, "-");
}

function convertToStorySlug(to: string) {
  return (
    to
      // Replace the last / with two --
      .replace(/(\/)([^\/]*)$/g, (_, __, storyName) => {
        // and param case the story name
        return `--${paramCase(storyName)}`;
      })
      // Replace remaining / with -
      .replace(/\//g, "-")
      .toLowerCase()
  );
}

type LinkProps = Omit<React.ComponentProps<typeof components.a>, "href"> & {
  to: string;
};

export const Link = React.forwardRef(
  ({ to, ...props }: LinkProps, ref: React.Ref<HTMLAnchorElement>) => {
    const storySlug = convertToStorySlug(to);
    const tree = useStoryTree();
    let docSlug = convertToDocSlug(to);
    const location = useLocation();
    const isStorybook = location.pathname.startsWith("/storybook");

    // Check if the link is a story
    if (stories[storySlug]) {
      // If docs/ then match the docs file and add the story as a hash
      if (!isStorybook) {
        const parts = to.split("/");
        const storyName = parts.pop()!;
        return (
          <components.a
            ref={ref}
            href={`/docs/${parts.join("-")}#${paramCase(storyName)}`}
            {...props}
          />
        );
      }

      return (
        <components.a ref={ref} href={`/storybook/${storySlug}`} {...props} />
      );
    }

    // If docs slug exists then it's a valid link
    if (stories[docSlug]) {
      return (
        <components.a
          ref={ref}
          href={`${isStorybook ? "/storybook" : ""}/docs/${docSlug}`}
          {...props}
        />
      );
    }

    // If we're linking to a StoryMDX in the docs/ we need to convert
    // that to a docs path with a hash to the first story.
    //
    // StoryMDX doesn't exist in stories since it a set of stories and has
    // no direct representation.
    const parts = to.split("/");
    const group = getStoryGroup(tree, parts);

    if (group && group[0]) {
      const firstStory = getFirstStory(group);
      const slug = parts.join("-");

      if (firstStory) {
        return (
          <components.a
            ref={ref}
            href={
              isStorybook
                ? `/storybook/docs/${slug}#${paramCase(firstStory.title)}`
                : `/docs/${slug}`
            }
            {...props}
          />
        );
      }
    }

    console.error({ docSlug, storySlug, stories });
    throw new Error(`Invalid link to: ${to}`);
  }
);
