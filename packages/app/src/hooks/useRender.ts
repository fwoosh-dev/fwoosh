import React from "react";
import { render } from "@fwoosh/app/render";
import { stories } from "@fwoosh/app/stories";

interface UseRenderOptions {
  id: string;
  slug: string;
}

export const useRender = ({ id, slug }: UseRenderOptions) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!id || !ref.current) {
      return;
    }

    if (!stories[slug]) {
      throw new Error(`Story not found: ${slug}`);
    }

    ref.current.id = id;
    render(ref.current, slug);
  }, [id, slug]);

  return ref;
};
