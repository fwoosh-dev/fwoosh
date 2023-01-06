import shiki from "rehype-shiki-reloaded";

export const shikiConfig = [
  (shiki as any).default,
  {
    theme: "github-light",
    darkTheme: "github-dark",
  },
] as const;
