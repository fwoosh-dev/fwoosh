import { styled } from "@fwoosh/styling";

export const HeaderBar = styled("div", {
  height: "$12",
  display: "flex",
  alignItems: "center",
  borderBottomWidth: "$sm",
  borderBottomStyle: "$solid",
  borderBottomColor: "$gray6",
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
