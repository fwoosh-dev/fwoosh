import * as React from "react";
import { stories, tree } from "@fwoosh/app/stories";
import { checkLink } from "@fwoosh/utils";
import { components } from "@fwoosh/components";
import { useLocation } from "react-router-dom";

type LinkProps = Omit<React.ComponentProps<typeof components.a>, "href"> & {
  to: string;
};

export const Link = React.forwardRef(
  ({ to, ...props }: LinkProps, ref: React.Ref<HTMLAnchorElement>) => {
    const location = useLocation();
    const isStorybook = location.pathname.startsWith("/storybook");
    const [, hash] = to.split("#");
    const story = checkLink(to, stories, tree);

    if (story.type === "basic" && isStorybook) {
      return (
        <components.a ref={ref} href={`/storybook/${story.slug}`} {...props} />
      );
    }

    return (
      <components.a
        ref={ref}
        href={`${isStorybook ? "/storybook" : ""}/docs/${story.grouping.replace(
          /\//g,
          "-"
        )}#${hash}`}
        {...props}
      />
    );
  }
);
