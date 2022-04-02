import React, { useState } from "react";
import { Sun, Moon } from "react-feather";
import {
  getInitialColorMode,
  setColorMode,
  darkTheme,
  styled,
} from "@fwoosh/components";

const ThemeToggleButton = styled("button", {
  color: "$gray11",
  height: "$10",
  width: "$10",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    background: "$gray3",
  },

  "&:active": {
    background: "$gray5",
  },
});

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
    <ThemeToggleButton
      onClick={onToggleTheme}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </ThemeToggleButton>
  );
};
