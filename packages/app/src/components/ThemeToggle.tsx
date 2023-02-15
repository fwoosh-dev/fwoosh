import React, { useState } from "react";
import { Sun, Moon } from "react-feather";
import { IconButton, Tooltip } from "@fwoosh/components";
import {
  getInitialColorMode,
  setColorMode,
  darkTheme,
  lightClass,
  darkClass,
} from "@fwoosh/styling";

export const ThemeToggle = React.forwardRef(function ThemeToggle(
  props: React.ComponentPropsWithoutRef<"button">,
  ref?: React.Ref<HTMLButtonElement>
) {
  const [theme, setTheme] = useState(getInitialColorMode());
  const ariaLabel =
    theme === "dark" ? "Activate light mode" : "Activate dark mode";
  const onToggleTheme = React.useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    setColorMode(newTheme);

    document.body.classList.toggle(darkTheme);
    document.body.classList.toggle(darkClass);
    document.body.classList.toggle(lightClass);
  }, [theme]);

  return (
    <Tooltip message={ariaLabel}>
      <IconButton ref={ref} {...props} onClick={onToggleTheme}>
        {theme === "dark" ? <Moon /> : <Sun />}
      </IconButton>
    </Tooltip>
  );
});
