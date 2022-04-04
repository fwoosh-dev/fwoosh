export * from "./components";
export * from "./stitches";
export * from "./dark-mode";
export * as Tabs from "./Tabs.js";
export * as Toolbar from "./Toolbar.js";
export * from "./PropsTable.js";
export * from "./StyledMarkdown.js";

import {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  p,
  code,
  pre,
  a,
  ul,
  ol,
  li,
  blockquote,
  table,
  th,
  tr,
  td,
} from "./components";

export const components = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  p,
  code,
  pre,
  a,
  ul,
  ol,
  li,
  blockquote,
  img: "img",

  table,
  th,
  tr,
  td,
} as const;
