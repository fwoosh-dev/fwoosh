import * as React from "react";
import makeClass from "clsx";

import * as styles from "./Button.module.css";

interface ButtonProps extends React.ComponentProps<"button"> {
  /** What variant the button should render as. */
  variant?: "destructive" | "primary";
}

export const Button = ({
  className,
  style,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={makeClass(className, styles.root)}
      style={{
        ...style,
        background: variant === "destructive" ? "red" : "lightblue",
      }}
      {...props}
    />
  );
};
