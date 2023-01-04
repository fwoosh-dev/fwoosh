import swc, { ImportDeclaration, Module } from "@swc/core";
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
import { log } from "@fwoosh/utils";

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

async function getComment(contents: string, i: number) {
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

    return await convertMarkdownToHtml(comment.join(""));
  }
}

function getComponentPath(ast: Module, file: string, value: string) {
  const imports = ast.body.filter(
    (node) => node.type === "ImportDeclaration"
  ) as ImportDeclaration[];
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

  log.info(`Parsing ${filename}...`);

  const contents = await fs.readFile(file, "utf8");
  const fullPath = path.resolve(file);

  if (file.endsWith(".mdx")) {
    try {
      const [, frontmatter] = contents.match(/^---\n(.+)\n---/) || [];

      if (frontmatter) {
        const fileDescriptor: FwooshFileDescriptor = {
          meta: yaml.load(frontmatter) as StoryMeta,
          mdxFile: fullPath,
        };

        data.push(fileDescriptor);
        log.trace("Found MDX file:", fileDescriptor);
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
              ${contents.slice(
                d.span.start - ast.span.start,
                d.span.end - ast.span.start
              )}
              \`\`\`
            `
        );

        return {
          exportName,
          title: capitalCase(exportName),
          slug: `${paramCase(meta.title)}--${paramCase(exportName)}`,
          file: fullPath,
          comment: await getComment(contents, d.span.start - ast.span.start),
          code: sanitizeString(String(code)),
        };
      })
    );

    const fileDescriptor: FwooshFileDescriptor = {
      stories,
      meta: { ...meta, file: fullPath },
    };
    data.push(fileDescriptor);
    log.trace("Found story file:", fileDescriptor);
  }

  log.info(`Completed parsing ${filename}!`);
}

export async function getStories({ stories, outDir }: FwooshOptions) {
  const files = await getStoryList({ stories, outDir });
  const data: FwooshFileDescriptor[] = [];

  await Promise.all(files.map((file) => getStory(file, data)));

  return data;
}
