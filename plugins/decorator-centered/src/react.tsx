import { styled } from "@fwoosh/styling";
import * as React from "react";

const Center = styled("div", {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const centered = (Story: () => any) =>
  function CenteredDecorator() {
    return (
      <Center>
        <Story />
      </Center>
    );
  };
