import * as React from "react";
import { Theme } from "@fwoosh/types";
import { slate, blue, blueDark, slateDark } from "@radix-ui/colors";

export const light: Theme = {
  colors: {
    ...(Object.fromEntries(
      Object.values(slate).map((color, index) => [`gray${index}`, color])
    ) as Record<string, string>),
    ...(Object.fromEntries(
      Object.values(blue).map((color, index) => [`primary${index}`, color])
    ) as Record<string, string>),
  },
};

export const dark: Theme = {
  colors: {
    ...(Object.fromEntries(
      Object.values(slateDark).map((color, index) => [`gray${index}`, color])
    ) as Record<string, string>),
    ...(Object.fromEntries(
      Object.values(blueDark).map((color, index) => [`primary${index}`, color])
    ) as Record<string, string>),
  },
};
