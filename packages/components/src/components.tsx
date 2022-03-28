import React, { useEffect, useState } from "react";
import makeClass from "clsx";
import { styled } from "./stitches";

export type Element<
  T extends keyof JSX.IntrinsicElements
> = React.PropsWithoutRef<JSX.IntrinsicElements[T]>;

const DEFAULT_SPACING = "my-4";
const DEFAULT_TEXT_COLOR = "text(gray-800 dark:gray-300)";

/** The component used to render a h1 */
const h1 = styled("h1", {
  text: "3xl",
  mb: 4,
  color: "$grey11",
  fontWeight: 600,

  "@md": {
    mb: 5,
  },
  "@lg": {
    text: "4xl",
  },
});

/** The component used to render a h2 */
const h2 = styled("h2", {
  text: "2xl",
  mt: 6,
  mb: 4,
  pb: 2,
  color: "$grey11",
  fontWeight: 500,
  borderBottom: "1px solid $gray6",

  "@md": {
    mb: 5,
  },
  "@lg": {
    text: "3xl",
    my: 8,
  },
});

/** The component used to render a h3 */
const h3 = styled("h2", {
  text: "xl",
  mt: 6,
  fontWeight: 500,
});

/** The component used to render a h4 */
const h4 = ({ className, ...props }: Element<"h4">) => (
  <h4
    className={makeClass("lvl4 text-xl font-semibold mt-8", className)}
    {...props}
  />
);

/** The component used to render a h5 */
const h5 = ({ className, ...props }: Element<"h5">) => (
  <h5
    className={makeClass("lvl5 text-lg font-semibold mt-8", className)}
    {...props}
  />
);

/** The component used to render a h6 */
const h6 = ({ className, ...props }: Element<"h6">) => (
  <h6
    className={makeClass("lvl6 text-md font-semibold mt-8", className)}
    {...props}
  />
);

/** The component used to render a p */
const p = styled("p", {
  my: 4,
  text: "lg",
  color: "$gray11",
});

/** The component used to render a li */
const li = ({ className, ...props }: Element<"li">) => (
  <li
    className={makeClass(DEFAULT_SPACING, className, DEFAULT_TEXT_COLOR)}
    {...props}
  />
);

/** The component used to render a blockquote */
const blockquote = styled("blockquote", {
  px: 4,
  py: 0.5,
  my: 6,
  borderLeft: "4px solid $primary8",
  text: "lg",
  background: "$primary2",
  "& p": {
    color: "$primary11",
  },
});

/** The component used to render a `code` in a line of text */
const InlineCode = styled("code", {
  fontSize: "max(12px, 85%)",
  whiteSpace: "nowrap",
  paddingTop: 0,
  paddingRight: 3,
  paddingBottom: 2,
  paddingLeft: 3,
  background: "$primary2",
  color: "$primary10",
});

/** The component used to render an block of code */
const code = ({ className, style, ...props }: Element<"code">) =>
  className && className.includes("language") ? (
    <code
      {...props}
      className={makeClass(
        className,
        "rounded py-6 px-4 text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700"
      )}
      style={{
        ...style,
      }}
    />
  ) : (
    <InlineCode className={className} style={style} {...props} />
  );

/** The component used to render a pre */
const pre = ({ style, className, ...props }: Element<"pre">) => (
  <pre
    className={makeClass(
      className,
      "pre rounded border dark:border-gray-700 my-6"
    )}
    style={{
      ...style,
      marginTop: "1.5rem",
      marginBottom: "1.5rem",
    }}
    {...props}
  />
);

/** The component used to render an anchor */
const a = React.forwardRef(
  (
    { href = "", className, ...props }: Element<"a">,
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    if (href.startsWith("http")) {
      return <a ref={ref} href={href} {...props} />;
    }

    return (
      <a
        ref={ref}
        href={href.includes("#") ? href.replace("#", ".html#") : `${href}.html`}
        className={makeClass(
          "cursor-pointer text-blue-500 dark:text-blue-400 focus-visible:ring ring-offset-2 focus:outline-none rounded",
          className
        )}
        {...props}
      />
    );
  }
);

export interface LazyLoaderProps {
  delay?: number;
}

export const Spinner = ({ delay = 250 }: LazyLoaderProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  if (!show) {
    return null;
  }

  return <div>Loading...</div>;
};

const table = ({ className, ...props }: Element<"table">) => (
  <div className="overflow-auto">
    <table
      className={makeClass(className, DEFAULT_TEXT_COLOR, "w-full my-6")}
      {...props}
    />
  </div>
);

const th = styled("th", {
  pb: 4,
  textAlign: "left",
  fontWeight: 300,
  color: "$gray10",
});

const td = styled("td", {
  py: 6,
  borderBottom: "1px solid",
  borderTop: "1px solid",
  borderColor: "$gray5",
});

const tr = ({ className, ...props }: Element<"tr">) => (
  <tr className={makeClass(className, "tr")} {...props} />
);

const hr = ({ className, ...props }: Element<"hr">) => (
  <hr
    className={makeClass(className, "m-12 border-b-2 dark:border-gray-700")}
    {...props}
  />
);

/** The component used to render an ul */
const ul = ({ className, ...props }: Element<"ul">) => (
  <ul className={makeClass(className, "my-6 ul")} {...props} />
);

/** The component used to render an ol */
const ol = ({ className, ...props }: Element<"ol">) => (
  <ol className={makeClass(className, "my-6 ol")} {...props} />
);

export const components = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  p,
  code,
  pre,
  a,
  ul,
  ol,
  li,
  blockquote,
  img: "img",

  table,
  th,
  tr,
  td,
} as const;

export type Components = typeof components;
