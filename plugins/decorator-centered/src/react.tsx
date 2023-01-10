import { styled } from "@fwoosh/components";
import * as React from "react";

const Center = styled("div", {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const centered = (Story: () => any) => {
  return (
    <Center>
      <Story />
    </Center>
  );
};
