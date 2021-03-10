import * as React from "react";

export const LayoutContext = React.createContext<{
  pages: string[];
  currentPage: string;
}>({
  pages: [],
  currentPage: "",
});
