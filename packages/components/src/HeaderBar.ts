import { styled } from "./stitches";

export const HeaderBar = styled("div", {
  height: "$14",
  display: "flex",
  alignItems: "center",
  borderWidth: "$sm",
  borderStyle: "$solid",
  borderColor: "$gray4",
  gap: "$2",
  px: 4,
  py: 2,
});

export const HeaderTitle = styled("div", {
  text: "lg",
  fontWeight: 400,
  color: "$gray11",
  width: "279px",
});
