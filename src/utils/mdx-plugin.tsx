// lifted from xdm to add features

import esbuild from "esbuild";
import { promises as fs } from "fs";
import { createProcessor } from "xdm";
import * as vfileMessage from "vfile-message";
import matter from "gray-matter";

import { endent } from "./endent.js";
import type { Layout, LayoutMatchContext } from "../types";

const eol = /\r\n|\r|\n|\u2028|\u2029/g;

export async function onload(
  processor: ReturnType<typeof createProcessor>,
  data: esbuild.OnLoadArgs,
  matchLayout: (
    args: Pick<LayoutMatchContext, "layout" | "path">
  ) => Promise<Layout | undefined>
): Promise<esbuild.OnLoadResult> {
  const errors: esbuild.PartialMessage[] = [];
  const warnings: esbuild.PartialMessage[] = [];
  let doc = String(await fs.readFile(data.path));
  const { data: frontMatter, content } = matter(doc);
  const layoutDefinition = await matchLayout({
    layout: frontMatter.layout,
    path: data.path,
  });

  if (frontMatter.layout && !layoutDefinition) {
    throw new Error(endent`
      You specified a layout that isn't registered!

      Layout: ${frontMatter.layout}
      Page: ${data.path}
    `);
  }

  let layout = "";

  if (layoutDefinition && !content.includes("export default function")) {
    layout = endent`
      import UserLayout from "${layoutDefinition.path}";

      export default function Layout(props) {
        return <UserLayout frontMatter={frontMatter} {...props} />
      }
    `;
  }

  doc = endent`
    export const frontMatter = ${JSON.stringify(frontMatter, null, 2)}

    ${layout}

    ${content}
  `;

  let messages: vfileMessage.VFileMessage[] = [];
  let file;
  let contents;

  try {
    file = await processor.process({ contents: doc, path: data.path });
    contents = file.contents;
    messages = file.messages;
  } catch (error) {
    error.fatal = true;
    messages.push(error);
  }

  for (let message of messages) {
    const { start, end } = message.location;
    let list = message.fatal ? errors : warnings;
    let length = 0;
    let lineStart = 0;
    let line = undefined;
    let column = undefined;

    if (start.line != null && start.column != null && start.offset != null) {
      line = start.line;
      column = start.column - 1;
      lineStart = start.offset - column;
      length = 1;

      if (end.line != null && end.column != null && end.offset != null) {
        length = end.offset - start.offset;
      }
    }

    eol.lastIndex = lineStart;
    const match = eol.exec(doc);
    const lineEnd = match ? match.index : doc.length;

    list.push({
      text: message.reason,
      location: {
        file: data.path,
        line,
        column,
        length: Math.min(length, lineEnd),
        lineText: doc.slice(lineStart, lineEnd),
      },
      detail: message,
    });
  }

  return { contents, errors, warnings, pluginData: { frontMatter } };
}
