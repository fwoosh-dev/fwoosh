import * as React from "react";
import { createStitches } from "@stitches/react";
import { light, dark } from "@fwoosh/theme-default";
import { config } from "@fwoosh/app/config";

type TextSize =
  | "xs"
  | "sm"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

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

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: { ...light, ...config.theme?.light },
  media: {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
    "2xl": "(min-width: 1536px)",
  },
  utils: {
    linearGradient: (value: string) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),
    m: (value: keyof typeof space) => ({
      margin: space[value],
    }),
    mt: (value: keyof typeof space) => ({
      marginTop: space[value],
    }),
    mr: (value: keyof typeof space) => ({
      marginRight: space[value],
    }),
    mb: (value: keyof typeof space) => ({
      marginBottom: space[value],
    }),
    ml: (value: keyof typeof space) => ({
      marginLeft: space[value],
    }),
    mx: (value: keyof typeof space) => ({
      marginLeft: space[value],
      marginRight: space[value],
    }),
    my: (value: keyof typeof space) => ({
      marginTop: space[value],
      marginBottom: space[value],
    }),
    p: (value: keyof typeof space) => ({
      padding: space[value],
    }),
    pt: (value: keyof typeof space) => ({
      paddingTop: space[value],
    }),
    pr: (value: keyof typeof space) => ({
      paddingRight: space[value],
    }),
    pb: (value: keyof typeof space) => ({
      paddingBottom: space[value],
    }),
    pl: (value: keyof typeof space) => ({
      paddingLeft: space[value],
    }),
    px: (value: keyof typeof space) => ({
      paddingLeft: space[value],
      paddingRight: space[value],
    }),
    py: (value: keyof typeof space) => ({
      paddingTop: space[value],
      paddingBottom: space[value],
    }),
    text: (value: TextSize) => {
      if (value === "xs") {
        return {
          fontSize: "0.75rem",
          lineHeight: "1rem",
        };
      }
      if (value === "sm") {
        return {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
        };
      }
      if (value === "lg") {
        return {
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
        };
      }
      if (value === "xl") {
        return {
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
        };
      }
      if (value === "2xl") {
        return {
          fontSize: "1.5rem",
          lineHeight: "2rem",
        };
      }
      if (value === "3xl") {
        return {
          fontSize: "1.875rem",
          lineHeight: "2.25rem",
        };
      }
      if (value === "4xl") {
        return {
          fontSize: "2.25rem",
          lineHeight: "2.5rem",
        };
      }
      if (value === "5xl") {
        return {
          fontSize: "3rem",
          lineHeight: "1",
        };
      }
      if (value === "6xl") {
        return {
          fontSize: "3.75rem",
          lineHeight: "1",
        };
      }
      if (value === "7xl") {
        return {
          fontSize: "4.5rem",
          lineHeight: "1",
        };
      }
      if (value === "8xl") {
        return {
          fontSize: "6rem",
          lineHeight: "1",
        };
      }
      if (value === "9xl") {
        return {
          fontSize: "8remm",
          lineHeight: "1",
        };
      }
      return {
        fontSize: "1rem",
        lineHeight: "1.5rem",
      };
    },
  },
});

export const darkTheme = createTheme({ ...dark, ...config.theme?.dark });

export type ColorMode = "light" | "dark";

export function getInitialColorMode(): "light" | "dark" {
  const persistedColorPreference = window.localStorage.getItem(
    "fwoosh-color-mode"
  );
  const hasPersistedPreference = typeof persistedColorPreference === "string";

  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (hasPersistedPreference) {
    return persistedColorPreference as ColorMode;
  }

  // If they haven't been explicit, let's check the media
  // query
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQueryPreference = typeof mql.matches === "boolean";

  if (hasMediaQueryPreference) {
    return mql.matches ? "dark" : "light";
  }

  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  return "light";
}

export function setColorMode(colorMode: ColorMode) {
  window.localStorage.setItem("fwoosh-color-mode", colorMode);
  const event = new CustomEvent("fwoosh-color-mode-change", {
    detail: { colorMode },
  });
  window.dispatchEvent(event);
}

export function getColorMode() {
  return window.localStorage.getItem("fwoosh-color-mode");
}

export const ColorModeContext = React.createContext<ColorMode | undefined>(
  "dark"
);
