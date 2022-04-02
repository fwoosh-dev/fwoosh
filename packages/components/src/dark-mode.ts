type ColorMode = "light" | "dark";

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
}
