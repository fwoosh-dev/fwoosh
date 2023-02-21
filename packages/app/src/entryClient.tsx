import "@unocss/reset/tailwind.css";
import "@code-hike/mdx/dist/index.css";

import * as React from "react";
import {
  version as reactDomVersion,
  render as ReactDOMRender,
} from "react-dom";
import { App, router } from "./App";
import { RouterProvider } from "react-router-dom";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No container element found");
}

const isReact18 = reactDomVersion.startsWith("18");
const app = (
  <App>
    <RouterProvider router={router} />
  </App>
);

if (isReact18) {
  import("react-dom/client").then(({ hydrateRoot }) => {
    hydrateRoot(root, app);
  });
} else {
  ReactDOMRender(app, root);
}
