import { Plugin, Fwoosh } from "fwoosh";

interface ReactPluginOptions {}

export default class ReactPlugin implements Plugin {
  name = "react";

  private options: ReactPluginOptions;

  constructor(options: ReactPluginOptions) {
    this.options = options;
  }

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.renderStory.tap(this.name, () => {
      return `
        import React, { Suspense } from "react";
        import ReactDOM from "react-dom";
        import { stories } from "@fwoosh/app/stories";
        import { Spinner } from "@fwoosh/components";
        
        export function render(slug) {
          try {
            ReactDOM.render(
              React.createElement(
                Suspense,
                {
                  fallback: React.createElement(Spinner, { deley: 300 }),
                },
                React.createElement(stories[slug].component)
              ),
              document.getElementById("story")
            );
          } catch (e) {
            console.log("error", e);
          }
        }      
      `;
    });
  }
}
