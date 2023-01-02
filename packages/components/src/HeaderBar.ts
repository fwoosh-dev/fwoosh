import { styled } from "./stitches";

export const HeaderBar = styled("div", {
  height: "$14",
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid $gray4",
  gap: 8,
  px: 4,
  py: 2,
});

export const HeaderTitle = styled("div", {
  text: "lg",
  fontWeight: 400,
  color: "$gray11",
  width: "279px",
});
