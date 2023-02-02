import { createRequire } from "module";
import fs from "fs";
import { remarkCodeHike } from "@code-hike/mdx";
import { SyntaxTheme } from "@fwoosh/types";

let syntaxTheme: SyntaxTheme = "nord";

export function setSyntaxTheme(theme: SyntaxTheme) {
  syntaxTheme = theme;
}

const require = createRequire(import.meta.url);

export const getCodeHikeConfig = () => {
  const themeObject = JSON.parse(
    fs.readFileSync(require.resolve(`shiki/themes/${syntaxTheme}.json`), "utf8")
  );

  return {
    theme: themeObject,
    showCopyButton: true,
    skipLanguages: [],
  } as Parameters<typeof remarkCodeHike>[0];
};
