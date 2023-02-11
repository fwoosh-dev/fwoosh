import "@unocss/reset/tailwind.css";
import "@code-hike/mdx/dist/index.css";

import React from "react";
import ReactDOM, { version as reactDomVersion } from "react-dom";
import { App } from "./App";

import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container element found");
}

const isReact18 = reactDomVersion && reactDomVersion.startsWith("18");

if (isReact18) {
  import("react-dom/client").then(({ createRoot }) => {
    createRoot(container).render(<App />);
  });
} else {
  ReactDOM.render(<App />, container);
}
