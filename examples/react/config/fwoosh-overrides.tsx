import * as React from "react";

export const h1 = (props: React.ComponentProps<"h1">) => {
  return <h1 style={{ color: "red", fontSize: 40 }} {...props} />;
};
