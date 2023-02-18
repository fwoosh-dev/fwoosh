import "@unocss/reset/tailwind.css";
import "@code-hike/mdx/dist/index.css";

import * as React from "react";
import {
  version as reactDomVersion,
  render as ReactDOMRender,
} from "react-dom";
import { App } from "./App";

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container element found");
}

const isReact18 = reactDomVersion.startsWith("18");

if (isReact18) {
  import("react-dom/client").then(({ createRoot }) => {
    createRoot(container).render(<App />);
  });
} else {
  ReactDOMRender(<App />, container);
}
