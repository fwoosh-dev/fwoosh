import * as React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, StaticRouterProvider } from "react-router-dom/server";
import { App, router } from "./App";

export function render(url: string, context: any) {
  return renderToString(
    <StaticRouter location={url} basename={process.env.FWOOSH_BASE_NAME}>
      <App>
        <StaticRouterProvider router={router} context={context} />
      </App>
    </StaticRouter>
  );
}
