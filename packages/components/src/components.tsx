import React, { useEffect, useState } from "react";
import makeClass from "clsx";

export type Element<
  T extends keyof JSX.IntrinsicElements
> = React.PropsWithoutRef<JSX.IntrinsicElements[T]>;

const DEFAULT_SPACING = "my-4";
const DEFAULT_TEXT_COLOR = "text(gray-800 dark:gray-300)";
const HEADER_TEXT_COLOR = "text(gray-900 dark:gray-200)";

/** The component used to render a h1 */
const h1 = ({ className, ...props }: Element<"h1">) => (
  <h1
    className={makeClass(
      className,
      "lvl1 text-3xl lg:text-4xl font-semibold mb-4 md:mb-8",
      HEADER_TEXT_COLOR
    )}
    {...props}
  />
);

/** The component used to render a h2 */
const h2 = ({ className, ...props }: Element<"h2">) => (
  <h2
    className={makeClass(
      "lvl2 text-2xl lg:text-3xl font-normal mb-4 md:mb-6 mt-6 lg:mt-8",
      className
    )}
    {...props}
  />
);

/** The component used to render a h3 */
const h3 = ({ className, ...props }: Element<"h3">) => (
  <h3
    className={makeClass(
      "lvl3 text-xl lg:text-2xl font-bold lg:font-semibold mt-6",
      className
    )}
    {...props}
  />
);

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
const p = ({ className, ...props }: Element<"p">) => (
  <p
    className={makeClass(DEFAULT_SPACING, className, DEFAULT_TEXT_COLOR)}
    {...props}
  />
);

/** The component used to render a li */
const li = ({ className, ...props }: Element<"li">) => (
  <li
    className={makeClass(DEFAULT_SPACING, className, DEFAULT_TEXT_COLOR)}
    {...props}
  />
);

/** The component used to render a blockquote */
const blockquote = ({ className, ...props }: Element<"blockquote">) => (
  <blockquote
    className={makeClass(
      "bg-gray-200 dark:bg-gray-800 px-6 py-6 my-8 border-l-4 border-blue-500",
      className
    )}
    {...props}
  />
);

/** The component used to render a `code` in a line of text */
const InlineCode = (props: Element<"code">) => (
  <code style={{ padding: "2px 6px", background: "#d0d0d0" }} {...props} />
);

/** The component used to render an block of code */
const code = ({ className, style, ...props }: Element<"code">) =>
  className && className.includes("language") ? (
    <code
      {...props}
      className={makeClass(
        className,
        "rounded text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700"
      )}
      style={{
        padding: "12px 20px",
        display: "block",
        overflow: "auto",
        borderRadius: 4,
        ...style,
      }}
    />
  ) : (
    <InlineCode className={className} style={style} {...props} />
  );

/** The component used to render a pre */
const pre = ({ style, className, ...props }: Element<"pre">) => (
  <pre
    className={makeClass(className, "rounded border dark:border-gray-700 my-6")}
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

const th = ({ className, ...props }: Element<"th">) => (
  <th
    className={makeClass(className, "pb-4 px-3 text-left font-semibold")}
    {...props}
  />
);

const td = ({ className, ...props }: Element<"td">) => (
  <td
    className={makeClass(
      className,
      "py-2 px-3 border-b border-t dark:border-gray-800"
    )}
    {...props}
  />
);

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
