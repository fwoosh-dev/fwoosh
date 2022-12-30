import React from "react";
import { render } from "@fwoosh/app/render";

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

    ref.current.id = id;
    render(ref.current, slug);
  }, [id, slug]);

  return ref;
};
