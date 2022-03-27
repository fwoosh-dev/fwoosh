import { Plugin, Fwoosh } from "fwoosh";
import docgen from "react-docgen-typescript";

interface ReactPluginOptions {
  docgenOptions: docgen.ParserOptions;
}

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
        
        export function render(id, slug) {
          if (!id) {
            return;
          }
          
          try {
            ReactDOM.render(
              React.createElement(
                Suspense,
                {
                  fallback: React.createElement(Spinner, { deley: 300 }),
                },
                React.createElement(stories[slug].component)
              ),
              document.getElementById(id)
            );
          } catch (e) {
            console.log("error", e);
          }
        }      
      `;
    });

    fwoosh.hooks.generateDocs.tap(this.name, (filepath) => {
      const docs = docgen.parse(filepath, this.options.docgenOptions);
      return docs;
    });
  }
}
