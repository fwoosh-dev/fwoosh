import {
  getInitialColorMode,
  darkTheme,
  darkClass,
  lightClass,
} from "@fwoosh/styling";

if (getInitialColorMode() === "dark") {
  document.body.classList.add(darkTheme);

  if (darkClass) {
    document.body.classList.add(darkClass);
  }
} else if (lightClass) {
  document.body.classList.add(lightClass);
}
