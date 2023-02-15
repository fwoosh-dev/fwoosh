import * as React from "react";
import { render } from "@fwoosh/app/render";
import { stories } from "@fwoosh/app/stories";
import { useParameters } from "@fwoosh/hooks";

interface UseRenderOptions {
  id: string;
  slug: string;
}

export const useRender = ({ id, slug }: UseRenderOptions) => {
  const [hasRendered, setHasRendered] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const parameters = useParameters();

  React.useEffect(() => {
    if (!id || !ref.current) {
      return;
    }

    if (!stories[slug]) {
      throw new Error(`Story not found: ${slug}`);
    }

    ref.current.id = id;
    setHasRendered(true);
    render(
      ref.current,
      slug,
      parameters,
      () => setHasRendered(false),
      () => setHasRendered(true)
    );
  }, [id, parameters, slug]);

  return { ref, hasRendered };
};
