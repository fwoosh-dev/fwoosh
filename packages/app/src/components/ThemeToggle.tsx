import React, { useState } from "react";
import { Sun, Moon } from "react-feather";
import { IconButton } from "@fwoosh/components";
import { getInitialColorMode, setColorMode, darkTheme } from "@fwoosh/styling";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialColorMode());
  const ariaLabel =
    theme === "dark" ? "Activate light mode" : "Activate dark mode";
  const onToggleTheme = React.useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    setColorMode(newTheme);

    if (newTheme === "light") {
      document.body.classList.remove(darkTheme);
    } else {
      document.body.classList.add(darkTheme);
    }
  }, [theme]);

  return (
    <IconButton
      onClick={onToggleTheme}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </IconButton>
  );
};
