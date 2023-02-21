import * as React from "react";
import { renderToString } from "react-dom/server";
import { HeadProvider } from "react-head";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./App";

export function render(url: string) {
  const headTags: any[] = [];
  const result = renderToString(
    <HeadProvider headTags={headTags}>
      <StaticRouter location={url} basename={process.env.FWOOSH_BASE_NAME}>
        <App />
      </StaticRouter>
    </HeadProvider>
  );

  return { result, headTags };
}
