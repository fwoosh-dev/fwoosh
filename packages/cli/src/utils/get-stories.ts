import swc from "@swc/core";
import { promises as fs } from "fs";
import { paramCase, capitalCase } from "change-case";
import glob from "fast-glob";
import path from "path";
import { createRequire } from "module";
import gfm from "remark-gfm";
import shiki from "rehype-shiki-reloaded";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

import { FwooshOptions, ResolvedStoryMeta, Story } from "../types";
import { endent } from "./endent.js";

const require = createRequire(import.meta.url);

const markdownToHtml = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use((shiki as any).default, {
    theme: "github-light",
    darkTheme: "github-dark",
  })
  .use(rehypeStringify)
  .use(gfm);

function sanitizeString(str: string) {
  return str.replace(/`/g, "\\\\`");
}

async function getComment(
  contents: string,
  offset: number,
  d: { span: { start: number } }
) {
  let i: number | undefined;

  if (
    contents[d.span.start - offset - 3] === "*" &&
    contents[d.span.start - offset - 2] === "/"
  ) {
    i = d.span.start - offset - 4;
  }

  if (
    contents[d.span.start - offset - 4] === "*" &&
    contents[d.span.start - offset - 3] === "/"
  ) {
    i = d.span.start - offset - 5;
  }

  if (typeof i === "number") {
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

    const html = await markdownToHtml.process(
      comment
        .join("")
        .trim()
        .split("\n")
        .map((line) => line.trim())
        .map((line) => line.replace(/^\s*\*/, ""))
        .join("\n")
    );

    return sanitizeString(String(html));
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

let parsed = 0;

export async function getStories({
  stories,
  outDir,
}: FwooshOptions): Promise<{ stories: Story[]; meta: ResolvedStoryMeta }[]> {
  const files = await glob(stories, {
    ignore: [`${outDir}/**`, "**/node_modules/**"],
  });

  const data = [];

  for (const file of files) {
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

    const stories: Story[] = await Promise.all(
      (storiesDeclarations as any).map(async (d: any) => {
        const exportName = d.declaration.declarations[0].id.value;
        const code = await markdownToHtml.process(
          endent`
            \`\`\`tsx
            ${contents.slice(d.span.start - parsed, d.span.end - parsed)}
            \`\`\`
          `
        );

        return {
          exportName,
          title: capitalCase(exportName),
          slug: `${paramCase(meta.title)}--${paramCase(exportName)}`,
          file: fullPath,
          comment: await getComment(contents, parsed, d),
          code: sanitizeString(String(code)),
        };
      })
    );

    // There's a bug in swc that causes it to not have the correct span.start
    // on subsequent calls to parse. This is a hack to fix that.
    // Because of this same bug we also have to parse story files linearly.
    parsed += 1 + contents.length;
    data.push({ stories, meta: { ...meta, file: fullPath } });
  }

  return data;
}
