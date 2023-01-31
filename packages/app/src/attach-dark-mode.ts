import {
  getInitialColorMode,
  darkTheme,
  darkClass,
  lightClass,
} from "@fwoosh/styling";

if (getInitialColorMode() === "dark") {
  document.body.classList.add(darkTheme);
  document.body.classList.add(darkClass);
} else {
  document.body.classList.add(lightClass);
}
