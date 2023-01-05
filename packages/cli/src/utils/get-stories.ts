import swc, { ImportDeclaration, Module } from "@swc/core";
import { promises as fs } from "fs";
import { paramCase, capitalCase } from "change-case";
import ms from "pretty-ms";
import { performance } from "perf_hooks";

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
import { chunkPromisesTimes, log } from "@fwoosh/utils";

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

export function sanitizeString(str: string) {
  return str.replace(/`/g, "\\`").replace(/\${/g, "\\${");
}

export async function convertMarkdownToHtml(markdown: string) {
  const html = await markdownToHtml.process(
    markdown
      .trim()
      .split("\n")
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

function findExportKeyword(contents: string, index: number): number {
  while (
    contents[index] &&
    contents[index] !== "e" &&
    contents[index + 1] !== "x" &&
    contents[index + 2] !== "p" &&
    contents[index + 3] !== "o" &&
    contents[index + 4] !== "r" &&
    contents[index + 5] !== "t"
  ) {
    index--;
  }

  return index;
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
const lastEnd = { value: 0 };

async function getStory(file: string, data: FwooshFileDescriptor[]) {
  const filename = path.basename(file);
  const start = performance.now();

  log.info(`Parse: ${filename}...`);

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
    const startAst = performance.now();
    const currentLastEnd = lastEnd.value;
    const ast = await swc.parse(contents, {
      syntax: "typescript",
      tsx: true,
      comments: false,
      script: true,
    });
    lastEnd.value = ast.span.end + 1;
    const offset = ast.span.start - 1 - currentLastEnd;
    const parsedContents = contents.slice(offset, ast.span.end);
    const endAst = performance.now();
    log.info(`Parse AST: ${filename} (${ms(endAst - startAst)})`);

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

    const startMDToHTML = performance.now();
    const stories: Story[] = await Promise.all(
      (storiesDeclarations as any).map(async (d: any) => {
        const exportName = d.declaration.declarations[0].id.value;
        const slug = `${paramCase(meta.title)}--${paramCase(exportName)}`;
        const start = d.span.start + offset - ast.span.start;
        const nearestExport = findExportKeyword(contents, start);
        const code = contents.slice(
          findExportKeyword(contents, d.span.start + offset - ast.span.start),
          d.span.end + offset - ast.span.start - (start - nearestExport)
        );

        return {
          exportName,
          title: capitalCase(exportName),
          slug,
          file: fullPath,
          comment: await getComment(contents, d.span.start - ast.span.start),
          code: sanitizeString(code),
        };
      })
    );
    const endMDToHTML = performance.now();
    log.info(`Generate highlighted code:(${ms(endMDToHTML - startMDToHTML)})`);

    const fileDescriptor: FwooshFileDescriptor = {
      stories,
      meta: { ...meta, file: fullPath },
    };
    data.push(fileDescriptor);
    log.trace("Found story file:", fileDescriptor);
  }

  const end = performance.now();

  log.info(`Parse complete: ${filename} (${ms(end - start)})\n`);
}

export async function getStories({ stories, outDir }: FwooshOptions) {
  const startFiles = performance.now();
  const files = await getStoryList({ stories, outDir });
  const endFiles = performance.now();

  log.info(`Get stories: (${ms(endFiles - startFiles)})`);
  log.info(`Found ${files.length} files`);
  log.debug(files);

  const startStories = performance.now();
  const data: FwooshFileDescriptor[] = [];

  await chunkPromisesTimes(files, 1, (file) => getStory(file, data));

  const endStories = performance.now();
  log.info(`Parse stories: (${ms(endStories - startStories)})`);

  return data;
}
