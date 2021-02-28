import { IShikiTheme } from "shiki";
import fs from "fs";
import path from "path";

export const resolveTheme = (theme: string | IShikiTheme, defaultTheme: string) => {
  return theme
    ? typeof theme === "string" && fs.existsSync(theme)
      ? path.resolve(theme)
      : theme
    : defaultTheme;
};
