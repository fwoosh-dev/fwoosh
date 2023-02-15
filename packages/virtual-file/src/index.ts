import { promises as fs } from "fs";
import esbuild from "esbuild";

export async function loadVirtualFile(
  string: string,
  vars: Record<string, string | number> = {}
) {
  const contents = await fs.readFile(string, "utf8");
  let { code } = await esbuild.transform(contents, {});

  for (const [name, value] of Object.entries(vars)) {
    code = code.replace(new RegExp(`process.env.${name}`, "g"), String(value));
  }

  return code;
}
