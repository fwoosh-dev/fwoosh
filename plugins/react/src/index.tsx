import { Plugin, Fwoosh } from "fwoosh";
import docgen from "react-docgen-typescript";
import ts from "typescript";

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
    let compilerOptions = {
      jsx: ts.JsxEmit.React,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.Latest,
    };

    const docGenParser = docgen.withCompilerOptions(
      compilerOptions,
      this.options.docgenOptions
    );

    let tsProgram: ts.Program;
    let files = new Set<string>();

    function createProgram() {
      return ts.createProgram(
        Array.from(files),
        compilerOptions,
        undefined,
        tsProgram
      );
    }

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
      files.add(filepath);
      const docs1 = docGenParser.parseWithProgramProvider(
        filepath,
        createProgram
      );
      return docs1;
    });
  }
}
