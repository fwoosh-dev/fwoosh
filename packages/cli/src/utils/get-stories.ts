import swc, { ImportDeclaration, Module } from "@swc/core";
import { promises as fs } from "fs";
import { titleCase } from "title-case";
import { ParsedStoryData, StoryMeta } from "@fwoosh/types";
import { chunkPromisesTimes, createStorySlug, log } from "@fwoosh/utils";
import { compile } from "@mdx-js/mdx";

import glob from "fast-glob";
import path from "path";
import { createRequire } from "module";
import gfm from "remark-gfm";
import matter from "gray-matter";
import { remarkCodeHike } from "@code-hike/mdx";

import { FwooshOptionsLoaded, ResolvedStoryMeta } from "@fwoosh/types";
import { getCodeHikeConfig } from "./code-hike-config.js";
import { endent } from "./endent.js";
import { perfLog } from "./performance.js";

const require = createRequire(import.meta.url);

/** Replaces characters in a string that are problematic when inserting into a template string  */
function sanitizeTemplateString(str: string) {
  return str.replace(/`/g, "\\`").replace(/\${/g, "\\${");
}

function sanitizeMarkdownString(str: string) {
  return str
    .split("\n")
    .map((i) => i.trim())
    .map((line) => line.replace(/^\*/, ""))
    .join("\n");
}

const markdownToHtmlCache = new Map<string, string>();

export async function convertMarkdownToHtml(markdown: string) {
  const html = markdownToHtmlCache.get(markdown);

  if (html) {
    log.info("Using cached markdown to html conversion");
    return html;
  }

  const mdxTimerEnd = perfLog("MDX compile");
  const compiledMdx = String(
    await compile(markdown, {
      remarkPlugins: [
        gfm,
        [remarkCodeHike, { autoImport: false, ...getCodeHikeConfig() }],
      ],
      outputFormat: "function-body",
      providerImportSource: "@mdx-js/react",
    })
  );
  mdxTimerEnd();

  markdownToHtmlCache.set(markdown, compiledMdx);
  return compiledMdx;
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

    const fullComment = comment.join("");

    return sanitizeMarkdownString(
      process.env.NODE_ENV === "production"
        ? await convertMarkdownToHtml(fullComment)
        : fullComment
    );
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
    componentImport.source.value.startsWith(".") ||
      componentImport.source.value.startsWith("/")
      ? path.resolve(path.dirname(file), componentImport.source.value)
      : componentImport.source.value
  );
}

export async function getStoryList({
  stories,
  outDir,
}: Pick<FwooshOptionsLoaded, "stories" | "outDir">) {
  return await glob(stories, {
    ignore: [`${outDir}/**`, "**/node_modules/**", "**/dist/**", "**/out/**"],
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
  stories: ParsedStoryData[];
  meta: ResolvedStoryMeta;
}

export interface MDXFileDescriptor {
  mdxFile: any;
  meta: ResolvedStoryMeta;
}

const storyFileCache = new Map<
  string,
  { descriptor: StoryFileDescriptor; time: number }
>();

export type FwooshFileDescriptor = StoryFileDescriptor | MDXFileDescriptor;
const lastEnd = { value: 0 };

async function parseStoryFile(file: string, data: FwooshFileDescriptor[]) {
  const parseStoryTimerEnd = perfLog(`Parse '${file}'`);
  const fullPath = path.resolve(file);

  if (file.endsWith(".mdx")) {
    try {
      const frontmatter = matter.read(fullPath);

      if (frontmatter.content) {
        const fileDescriptor: FwooshFileDescriptor = {
          meta: frontmatter.data as StoryMeta,
          mdxFile: fullPath,
        };
        data.push(fileDescriptor);
        log.trace("Found MDX file:", fileDescriptor);
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    const cached = storyFileCache.get(fullPath);
    const modifiedTime = await fs.stat(fullPath).then((s) => s.mtimeMs);

    if (cached && cached.time === modifiedTime) {
      log.info("Using cached story data for", fullPath);
      data.push(cached.descriptor);
      return;
    }

    const contents = await fs.readFile(file, "utf8");
    const currentLastEnd = lastEnd.value;
    const ast = await swc.parse(contents, {
      syntax: "typescript",
      tsx: true,
      comments: false,
      script: true,
    });
    lastEnd.value = ast.span.end + 1;
    const offset = ast.span.start - 1 - currentLastEnd;

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
    const stories: ParsedStoryData[] = await Promise.all(
      (storiesDeclarations as any).map(async (d: any) => {
        const exportName = d.declaration.declarations[0].id.value;
        const start = d.span.start + offset - ast.span.start;
        const nearestExport = findExportKeyword(contents, start);
        const code = contents.slice(
          nearestExport,
          d.span.end + offset - ast.span.start - (start - nearestExport)
        );

        return {
          exportName,
          title: titleCase(exportName),
          slug: createStorySlug(meta.title, exportName),
          file: fullPath,
          comment: await getComment(contents, nearestExport),
          code: sanitizeTemplateString(
            process.env.NODE_ENV === "production"
              ? await convertMarkdownToHtml(endent`
                  \`\`\`tsx
                  ${code}
                  \`\`\`
                `)
              : code
          ),
        };
      })
    );

    const fileDescriptor: FwooshFileDescriptor = {
      stories,
      meta: { ...meta, file: fullPath },
    };

    data.push(fileDescriptor);
    storyFileCache.set(fullPath, {
      descriptor: fileDescriptor,
      time: modifiedTime,
    });

    log.trace("Found story file:", fileDescriptor);
  }

  parseStoryTimerEnd();
}

export async function getStoryData({ stories, outDir }: FwooshOptionsLoaded) {
  const getStoryListTimerEnd = perfLog("Get story list");
  const files = await getStoryList({ stories, outDir });
  getStoryListTimerEnd();

  log.info(`Found ${files.length} files`);
  log.debug(files);

  const parseAllStoriesTimerEnd = perfLog("Parse stories");
  const data: FwooshFileDescriptor[] = [];

  // Running in parallel causes issues with the AST
  await chunkPromisesTimes(files, 1, (file) => parseStoryFile(file, data));
  parseAllStoriesTimerEnd();

  return data;
}
