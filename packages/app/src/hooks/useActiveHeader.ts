import * as React from "react";
import { CONTENT_ID, HEADING_SELECTOR } from "@fwoosh/utils";
import { useLocation } from "react-router-dom";

export function useActiveHeader(ref: React.RefObject<HTMLElement>) {
  const location = useLocation();

  React.useEffect(() => {
    const content = document.getElementById(CONTENT_ID);

    if (!content) {
      return;
    }

    function setActive(id: string | null) {
      if (!id) {
        return;
      }

      ref.current
        ?.querySelectorAll("a")
        ?.forEach((anchor) => anchor.removeAttribute("aria-current"));
      ref.current
        ?.querySelector(`[href="#${id}"]`)
        ?.setAttribute("aria-current", "true");
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.map((entry) => {
          if (entry.isIntersecting && entry.intersectionRect.top < 100) {
            setActive(entry.target.getAttribute("id"));
          }
        });
      },
      {
        threshold: [0.5, 1],
        rootMargin: "200px 0px",
      }
    );

    content.querySelectorAll(HEADING_SELECTOR).forEach((header) => {
      intersectionObserver.observe(header);
    });

    const mutationObserver = new MutationObserver((entries) => {
      entries.map((entry) => {
        entry.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return;
          }

          const newHeadings = node.querySelectorAll(HEADING_SELECTOR);

          newHeadings.forEach((node) => {
            intersectionObserver.observe(node);
          });
        });
      });
    });

    mutationObserver.observe(content, {
      childList: true,
      subtree: true,
    });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [location, ref]);
}
