import { styled } from "@fwoosh/styling";

export const AppWrapper = styled("div", {
  background: "$gray1",
  minHeight: "100vh",
  fontFamily: "Inter, system-ui",

  "@supports (font-variation-settings: normal)": {
    fontFamily: "Inter Var, system-ui",
  },
});

export const Logo = styled("div", {
  px: 12,
  py: 6,
});

export const Content = styled("div", {
  height: "100%",
  overflowY: "auto",
});

export const PageWrapper = styled("main", {
  mt: 10,
  mb: 28,
  mx: "auto",
  px: 8,
  maxWidth: "$4xl",
  width: "100%",
  minWidth: 0,
});

export const IconButton = styled("button", {
  color: "$gray11",
  height: "$8",
  width: "$8",
  borderRadius: "4px",
  p: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    background: "$gray3",
  },

  "&:active": {
    background: "$gray5",
  },
});

export const DocsLayout = styled("div", {
  display: "grid",

  "@xl": {
    gridTemplateColumns: "1fr minmax(200px, $72)",
  },
});