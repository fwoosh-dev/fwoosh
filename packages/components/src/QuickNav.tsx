import { styled } from "./stitches";

export const Root = styled("nav", {
  py: 10,
  position: "sticky",
  top: 0,
  height: "fit-content",
  px: 4,
  display: "none",
  overflow: "auto",
  maxHeight: "calc(100vh - $14)",

  "@lg": {
    display: "block",
  },
});

export const Header = styled("div", {
  display: "flex",
  alignItems: "center",
  px: 2,
  my: 2,
});

export const Title = styled("h1", {
  text: "xl",
  color: "$gray11",
  flex: 1,
});

export const Item = styled("li", {
  height: "$8",
  text: "sm",
  display: "flex",
  alignItems: "center",
  px: 2,

  "&:hover": {
    color: "$gray11",
    backgroundColor: "$gray2",
  },

  "&:active": {
    color: "$gray11",
    backgroundColor: "$gray4",
  },
});

export const Group = styled("div", {
  [`& ${Item}`]: {
    paddingLeft: "20px",
  },
  [`& & ${Item}`]: {
    paddingLeft: "40px",
  },
  [`& & & ${Item}`]: {
    paddingLeft: "60px",
  },
  [`& & & & ${Item}`]: {
    paddingLeft: "80px",
  },
  [`& & & & & ${Item}`]: {
    paddingLeft: "100px",
  },
});

export const Link = styled("a", {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  color: "$gray9",

  "&[aria-current]": {
    color: "$gray11",
    fontWeight: 500,
  },
});
