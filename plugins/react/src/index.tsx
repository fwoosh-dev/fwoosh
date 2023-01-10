import { Plugin, Fwoosh } from "fwoosh";
import * as docgen from "react-docgen-typescript";
import ts from "typescript";
import { loadVirtualFile } from "@fwoosh/virtual-file";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

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
      return loadVirtualFile(require.resolve("./renderStory"));
    });
  }
}

export * from "./types";
