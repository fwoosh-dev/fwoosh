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

    // make wrapper a shadow root
    const shadowRoot = ref.current.attachShadow({ mode: "open" });
    // put content into shadow root
    const storyRoot = document.createElement("div");
    storyRoot.id = id;
    shadowRoot.appendChild(storyRoot);
    // get the root element from the shadow root
    const root = ref.current.shadowRoot?.querySelector(
      `#${id}`
    ) as HTMLDivElement;
    console.log(root);

    render(root, slug);
  }, [id, slug]);

  return ref;
};
