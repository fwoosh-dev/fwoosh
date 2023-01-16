import "@unocss/reset/tailwind.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container element found");
}

const root = createRoot(container);

root.render(<App />);
