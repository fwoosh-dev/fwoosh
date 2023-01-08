import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { stories } from "@fwoosh/app/stories";
import { Spinner, ErrorBoundary } from "@fwoosh/components";

export function render(el: Element, slug: string) {
  if (!el) {
    return;
  }

  try {
    ReactDOM.render(
      React.createElement(
        ErrorBoundary,
        {},
        React.createElement(
          Suspense,
          {
            fallback: React.createElement(Spinner, { delay: 300 }),
          },
          React.createElement(stories[slug].component)
        )
      ),
      el
    );
  } catch (e) {
    console.error("error", e);
  }
}
