import { styled } from "@fwoosh/styling";

export const AppWrapper = styled("div", {
  background: "$gray1",
  height: "100%",
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
  padding: "$12 $8 $16",
  mx: "auto",
  maxWidth: "$4xl",
  width: "100%",
  minWidth: 0,
  minHeight: "100%",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
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
  height: "fit-content",
  minHeight: "100%",

  "@xl": {
    gridTemplateColumns: "1fr minmax(200px, $72)",
  },
});
