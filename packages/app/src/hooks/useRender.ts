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

    //   if (ref.current.shadowRoot) {
    //     ref.current.shadowRoot.innerHTML = "";
    //   }

    //   // make wrapper a shadow root
    //   const shadowRoot =
    //     ref.current.shadowRoot || ref.current.attachShadow({ mode: "open" });
    //   // put content into shadow root
    //   const storyRoot = document.createElement("div");
    //   storyRoot.id = id;
    //   shadowRoot.appendChild(storyRoot);
    //   // get the root element from the shadow root
    //   const root = ref.current.shadowRoot?.querySelector(
    //     `#${id}`
    //   ) as HTMLDivElement;

    //   render(root, slug);

    const storyRoot = document.createElement("div");
    storyRoot.id = id;
    ref.current.appendChild(storyRoot);
    render(storyRoot, slug);
  }, [id, slug]);

  return ref;
};
