import { Theme } from "@fwoosh/types";
import { mauve, pink, mauveDark, pinkDark } from "@radix-ui/colors";

const space = {
  0: "0",
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
  auto: "auto",
};

const sizes = {
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
};

type Gray = `gray${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11}`;
type Primary = `primary${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11}`;

export const light = {
  colors: {
    ...(Object.fromEntries(
      Object.values(mauve).map((color, index) => [`gray${index}`, color])
    ) as Record<Gray, string>),
    ...(Object.fromEntries(
      Object.values(pink).map((color, index) => [`primary${index}`, color])
    ) as Record<Primary, string>),
  },
  space: space,
  sizes: { ...space, ...sizes },
  radii: {
    sm: "2px",
    round: "4px",
  },
  borderWidths: {
    sm: "1px",
  },
  borderStyles: {
    solid: "solid",
  },
} satisfies Theme;

export const dark = {
  colors: {
    ...Object.fromEntries(
      Object.values(mauveDark).map((color, index) => [`gray${index}`, color])
    ),
    ...Object.fromEntries(
      Object.values(pinkDark).map((color, index) => [`primary${index}`, color])
    ),
  },
} satisfies Theme;
