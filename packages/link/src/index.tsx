import * as React from "react";
import { stories, tree } from "@fwoosh/app/stories";
import { checkLink } from "@fwoosh/utils";
import { components } from "@fwoosh/components";
import { useIsWorkbench } from "@fwoosh/hooks";

type LinkProps = Omit<React.ComponentProps<typeof components.a>, "href"> & {
  to: string;
};

export const Link = React.forwardRef(
  ({ to, ...props }: LinkProps, ref: React.Ref<HTMLAnchorElement>) => {
    const isWorkbench = useIsWorkbench();
    const [, hash] = to.split("#");
    const story = checkLink(to, stories, tree);

    if (story.type === "basic" && isWorkbench) {
      return (
        <components.a ref={ref} href={`/workbench/${story.slug}`} {...props} />
      );
    }

    return (
      <components.a
        ref={ref}
        href={`${isWorkbench ? "/workbench" : ""}/docs/${story.grouping.replace(
          /\//g,
          "-"
        )}#${hash}`}
        {...props}
      />
    );
  }
);
