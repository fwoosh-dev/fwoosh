import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import "inter-ui/inter.css";
import "@unocss/reset/tailwind.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container element found");
}

const root = createRoot(container);

root.render(<App />);
