// import darkTheme from "shiki/themes/github-dark.json";

import { createRequire } from "module";
import fs from "fs";
import { remarkCodeHike } from "@code-hike/mdx";

const require = createRequire(import.meta.url);

// theme: "github-light",
// darkTheme: "github-dark",

const theme = JSON.parse(
  fs.readFileSync(require.resolve("shiki/themes/github-dark.json"), "utf8")
);

export const codeHikeConfig: Parameters<typeof remarkCodeHike>[0] = {
  theme,
  showCopyButton: true,
  skipLanguages: [],
};
