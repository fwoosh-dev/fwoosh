import { getInitialColorMode, darkTheme } from "@fwoosh/styling";

if (getInitialColorMode() === "dark") {
  document.body.classList.add(darkTheme);
}
