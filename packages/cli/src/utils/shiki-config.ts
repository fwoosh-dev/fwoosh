import shiki from "rehype-shiki-reloaded";

export const shikiConfig = [
  (shiki as any).default,
  {
    theme: "github-light",
    darkTheme: "github-dark",
  } satisfies Parameters<typeof shiki>[0],
] as const;
