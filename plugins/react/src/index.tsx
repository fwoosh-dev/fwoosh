import { Plugin, Fwoosh } from "fwoosh";
import docgen from "react-docgen-typescript";
import ts from "typescript";

interface ReactPluginOptions {
  tsconfig?: string;
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

    if (this.options.tsconfig) {
      const configFile = ts.readConfigFile(
        this.options.tsconfig,
        ts.sys.readFile
      );
      const userCompilerOptions = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        "./"
      );

      compilerOptions = {
        ...compilerOptions,
        ...userCompilerOptions.options,
      };
    }

    const docGenParser = docgen.withCompilerOptions(
      compilerOptions,
      this.options.docgenOptions
    );

    let tsProgram: ts.Program;
    let files = new Set<string>();

    function createProgram() {
      const newProgram = ts.createProgram(
        Array.from(files),
        compilerOptions,
        undefined,
        tsProgram
      );
      tsProgram = newProgram;
      return newProgram;
    }

    fwoosh.hooks.generateDocs.tap(this.name, (filepath) => {
      files.add(filepath);
      const docs1 = docGenParser.parseWithProgramProvider(
        filepath,
        createProgram
      );
      return docs1;
    });

    fwoosh.hooks.renderStory.tap(this.name, () => {
      return `
        import React, { Suspense } from "react";
        import ReactDOM from "react-dom";
        import { stories } from "@fwoosh/app/stories";
        import { Spinner, ErrorBoundary } from "@fwoosh/components";
        
        export function render(el, slug) {
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
                    fallback: React.createElement(Spinner, { deley: 300 }),
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
      `;
    });
  }
}
