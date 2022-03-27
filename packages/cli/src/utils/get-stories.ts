import swc from "@swc/core";
import { promises as fs } from "fs";
import { paramCase, capitalCase } from "change-case";
import glob from "fast-glob";
import path from "path";
import { createRequire } from "module";

import { FwooshOptions, ResolvedStoryMeta, Story, StoryMeta } from "../types";

const require = createRequire(import.meta.url);

function getComment(contents: string, d: { span: { start: number } }) {
  if (
    contents[d.span.start - 3] === "*" &&
    contents[d.span.start - 2] === "/"
  ) {
    let i = d.span.start - 4;
    const comment = [contents[i]];

    while (true) {
      if (
        contents[i - 2] === "/" &&
        contents[i - 1] === "*" &&
        contents[i] === "*"
      ) {
        break;
      }

      // Not a jsDoc comment so we can't parse it
      if (contents[i - 1] === "/" && contents[i] === "*") {
        return;
      }

      comment.unshift(contents[i--]);
    }

    return comment.join("").trim();
  }
}

function getComponentPath(ast: swc.Module, file: string, value: string) {
  const imports = ast.body.filter(
    (node) => node.type === "ImportDeclaration"
  ) as swc.ImportDeclaration[];
  const componentImport = imports.find((node) =>
    node.specifiers.find((s) => s.local.value === value)
  );

  if (!componentImport) {
    return;
  }

  // TODO - handle re-exports
  return require.resolve(
    path.resolve(path.dirname(file), componentImport.source.value)
  );
}

export async function getStories({
  stories,
  outDir,
}: FwooshOptions): Promise<{ stories: Story[]; meta: ResolvedStoryMeta }[]> {
  const files = await glob(stories, {
    ignore: [`${outDir}/**`],
  });

  return Promise.all(
    files.map(async (file) => {
      const contents = await fs.readFile(file, "utf8");
      const fullPath = path.resolve(file);

      const ast = await swc.parse(contents, {
        syntax: "typescript",
        tsx: true,
        comments: false,
        script: true,
      });

      const exports = ast.body.filter(
        (node) => node.type === "ExportDeclaration"
      );

      const metaDeclaration = exports.find(
        (e) =>
          "declaration" in e &&
          e.declaration.type === "VariableDeclaration" &&
          "value" in e.declaration.declarations[0].id &&
          e.declaration.declarations[0].id.value === "meta"
      );
      const meta = (metaDeclaration as any).declaration.declarations[0].init.properties.reduce(
        (acc: Record<string, unknown>, property: Record<string, any>) => ({
          ...acc,
          [property.key.value]:
            property.key.value === "component"
              ? getComponentPath(ast, fullPath, property.value.value)
              : property.value.value,
        }),
        {}
      );
      const storiesDeclarations = exports.filter((e) => e !== metaDeclaration);
      const stories = (storiesDeclarations as any).map((d: any) => {
        const exportName = d.declaration.declarations[0].id.value;
        return {
          exportName,
          title: capitalCase(exportName),
          slug: `${paramCase(meta.title)}--${paramCase(exportName)}`,
          file: fullPath,
          comment: getComment(contents, d),
        };
      });

      return { stories, meta: { ...meta, file: fullPath } };
    })
  );
}
