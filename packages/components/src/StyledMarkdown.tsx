import React from "react";
import { components } from "./components";
import { Interweave, TransformCallback } from "interweave";

const transform: TransformCallback = (node, children) => {
  const props = node.getAttributeNames().reduce(
    (acc, name) => ({
      ...acc,
      [name === "classname" ? "className" : name]:
        name === "style"
          ? Object.fromEntries(
              node
                .getAttribute(name)
                ?.split(";")
                .filter(Boolean)
                .map((i) => i.split(": ")) || []
            )
          : node.getAttribute(name),
    }),
    {}
  );

  for (const [name, value] of Object.entries(components)) {
    if (node.tagName === name.toUpperCase()) {
      return React.createElement(value as any, props, children);
    }
  }
};

export const StyledMarkdown = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <Interweave
      transform={transform}
      className={className}
      content={children.replace(/class=/g, "className=")}
    />
  );
};
