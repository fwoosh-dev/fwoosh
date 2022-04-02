import { lazy } from "react";

export const modules = Object.fromEntries(
  Object.entries(import.meta.glob("../pages/*.mdx")).map(([filepath, mod]) => [
    filepath.replace("../pages/", "").replace(".mdx", ""),
    lazy(mod as any),
  ])
);
