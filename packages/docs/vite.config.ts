import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import rehypeSlug from "rehype-slug";
import shiki from "rehype-shiki-reloaded";
import gfm from "remark-gfm";

export default defineConfig({
  plugins: [
    react(),
    mdx({
      remarkPlugins: [gfm],
      rehypePlugins: [
        rehypeSlug,
        [
          (shiki as any).default,
          {
            theme: "github-light",
            darkTheme: "github-dark",
          },
        ],
      ],
    }),
  ],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
