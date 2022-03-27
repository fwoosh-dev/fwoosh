import * as React from "react";
import makeClass from "clsx";

import * as styles from "./Link.module.css";

interface LinkProps extends React.ComponentProps<"a"> {
  /** Open link in new window */
  newWindow?: boolean;
}

export const Link = ({ className, style, newWindow, ...props }: LinkProps) => {
  return (
    <a
      className={makeClass(className, styles.root)}
      target={newWindow ? "_blank" : undefined}
      {...props}
    />
  );
};
