import swc from "@swc/core";
import { promises as fs } from "fs";
import { paramCase, capitalCase } from "change-case";
import glob from "fast-glob";
import path from "path";
import { createRequire } from "module";
import gfm from "remark-gfm";
import yaml from "js-yaml";
import shiki from "rehype-shiki-reloaded";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

import { FwooshOptions, ResolvedStoryMeta, Story, StoryMeta } from "../types";
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
  return str.replace(/`/g, "\\\\`").replace(/\${/g, "\\${");
}

export async function convertMarkdownToHtml(markdown: string) {
  const html = await markdownToHtml.process(
    markdown
      .trim()
      .split("\n")
      .map((line) => line.trim())
      .map((line) => line.replace(/^\s*\*/, ""))
      .join("\n")
  );

  return sanitizeString(String(html));
}

let parsed = 1;

function getComment(contents: string, d: { span: { start: number } }) {
  let i = d.span.start - parsed;

  while (contents[i] !== "\n") {
    i--;
  }

  if (contents[i - 1] === "/" && contents[i - 2] === "*") {
    i -= 3;
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

    return convertMarkdownToHtml(comment.join(""));
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

export async function getStoryList({
  stories,
  outDir,
}: Pick<FwooshOptions, "stories" | "outDir">) {
  return await glob(stories, {
    ignore: [`${outDir}/**`, "**/node_modules/**"],
  });
}

interface StoryFileDescriptor {
  stories: Story[];
  meta: ResolvedStoryMeta;
}

export interface MDXFileDescriptor {
  mdxFile: any;
  meta: ResolvedStoryMeta;
}

export type FwooshFileDescriptor = StoryFileDescriptor | MDXFileDescriptor;

async function getStory(file: string, data: FwooshFileDescriptor[]) {
  const filename = path.basename(file);
  const contents = await fs.readFile(file, "utf8");
  const fullPath = path.resolve(file);

  if (file.endsWith(".mdx")) {
    try {
      const [, frontmatter] = contents.match(/^---\n(.+)\n---/) || [];

      if (frontmatter) {
        data.push({
          meta: yaml.load(frontmatter) as StoryMeta,
          mdxFile: fullPath,
        });
      }
    } catch (e) {
      console.error(e);
    }
  } else {
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
    const defaultExport = ast.body.find(
      (node) => node.type === "ExportDefaultExpression"
    );
    const metaObject = metaDeclaration
      ? (metaDeclaration as any).declaration.declarations[0].init
      : (defaultExport as any).expression;
    const meta = metaObject.properties.reduce(
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
          comment: getComment(contents, d),
          code: "",
          // code: sanitizeString(String(code)),
        };
      })
    );

    data.push({ stories, meta: { ...meta, file: fullPath } });
    // TODO - this is a hack to get the correct span for the next story
    parsed = ast.span.end + 2;
  }
}

export async function getStories({ stories, outDir }: FwooshOptions) {
  const files = await getStoryList({ stories, outDir });
  const data: FwooshFileDescriptor[] = [];

  await Promise.all(files.map((file) => getStory(file, data)));

  return data;
}
