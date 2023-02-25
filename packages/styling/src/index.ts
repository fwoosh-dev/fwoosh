import * as React from "react";
import { createStitches } from "@stitches/react";
import * as base from "@fwoosh/theme-default";
import { config } from "@fwoosh/app/config";

const lightThemeOverride = config.themes.find((t) => t.type === "light");

const darkThemeOverride = config.themes.find((t) => t.type === "light");

export const lightClass = lightThemeOverride?.class ?? "";
export const darkClass = darkThemeOverride?.class ?? "";

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

const baseTheme = {
  ...base.baseTheme.tokens,
  ...lightThemeOverride?.tokens,
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
  theme: baseTheme,
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
    m: (value: base.Space) => ({
      margin: baseTheme.space?.[value],
    }),
    mt: (value: base.Space) => ({
      marginTop: baseTheme.space?.[value],
    }),
    mr: (value: base.Space) => ({
      marginRight: baseTheme.space?.[value],
    }),
    mb: (value: base.Space) => ({
      marginBottom: baseTheme.space?.[value],
    }),
    ml: (value: base.Space) => ({
      marginLeft: baseTheme.space?.[value],
    }),
    mx: (value: base.Space) => ({
      marginLeft: baseTheme.space?.[value],
      marginRight: baseTheme.space?.[value],
    }),
    my: (value: base.Space) => ({
      marginTop: baseTheme.space?.[value],
      marginBottom: baseTheme.space?.[value],
    }),
    p: (value: base.Space) => ({
      padding: baseTheme.space?.[value],
    }),
    pt: (value: base.Space) => ({
      paddingTop: baseTheme.space?.[value],
    }),
    pr: (value: base.Space) => ({
      paddingRight: baseTheme.space?.[value],
    }),
    pb: (value: base.Space) => ({
      paddingBottom: baseTheme.space?.[value],
    }),
    pl: (value: base.Space) => ({
      paddingLeft: baseTheme.space?.[value],
    }),
    px: (value: base.Space) => ({
      paddingLeft: baseTheme.space?.[value],
      paddingRight: baseTheme.space?.[value],
    }),
    py: (value: base.Space) => ({
      paddingTop: baseTheme.space?.[value],
      paddingBottom: baseTheme.space?.[value],
    }),
    text: (value: TextSize | undefined) => {
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

export const darkTheme = createTheme({
  ...base.darkTheme.tokens,
  ...darkThemeOverride?.tokens,
});

export type ColorMode = "light" | "dark";

export function getInitialColorMode(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "light";
  }

  const persistedColorPreference =
    typeof window !== "undefined"
      ? window.localStorage.getItem("fwoosh-color-mode")
      : null;
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
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem("fwoosh-color-mode", colorMode);
  const event = new CustomEvent("fwoosh-color-mode-change", {
    detail: { colorMode },
  });
  window.dispatchEvent(event);
}

export function getColorMode() {
  if (typeof window === "undefined") {
    return;
  }

  return window.localStorage.getItem("fwoosh-color-mode");
}

export const ColorModeContext = React.createContext<ColorMode | undefined>(
  "dark"
);
