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

type Space = NonNullable<typeof light.space>;

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: { ...light, ...(config.theme?.light as typeof light | undefined) },
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
    m: (value: keyof Space) => ({
      margin: light.space![value],
    }),
    mt: (value: keyof Space) => ({
      marginTop: light.space![value],
    }),
    mr: (value: keyof Space) => ({
      marginRight: light.space![value],
    }),
    mb: (value: keyof Space) => ({
      marginBottom: light.space![value],
    }),
    ml: (value: keyof Space) => ({
      marginLeft: light.space![value],
    }),
    mx: (value: keyof Space) => ({
      marginLeft: light.space![value],
      marginRight: light.space![value],
    }),
    my: (value: keyof Space) => ({
      marginTop: light.space![value],
      marginBottom: light.space![value],
    }),
    p: (value: keyof Space) => ({
      padding: light.space![value],
    }),
    pt: (value: keyof Space) => ({
      paddingTop: light.space![value],
    }),
    pr: (value: keyof Space) => ({
      paddingRight: light.space![value],
    }),
    pb: (value: keyof Space) => ({
      paddingBottom: light.space![value],
    }),
    pl: (value: keyof Space) => ({
      paddingLeft: light.space![value],
    }),
    px: (value: keyof Space) => ({
      paddingLeft: light.space![value],
      paddingRight: light.space![value],
    }),
    py: (value: keyof Space) => ({
      paddingTop: light.space![value],
      paddingBottom: light.space![value],
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
