import * as React from "react";
import makeClass from "clsx";

import * as styles from "./Button.module.css";

export const Button = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button
      type="button"
      className={makeClass(className, styles.root)}
      {...props}
    />
  );
};
