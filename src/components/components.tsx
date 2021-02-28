import React from "react";
import makeClass from "clsx";

export type Element<
  T extends keyof JSX.IntrinsicElements
> = React.PropsWithoutRef<JSX.IntrinsicElements[T]>;

const DEFAULT_SPACING = "my-4";
const DEFAULT_TEXT_COLOR = "text-gray-800 dark:text-gray-300";
const HEADER_TEXT_COLOR = "text-gray-900 dark:text-gray-200";

/** The component used to render a h1 */
const h1 = ({ className, ...props }: Element<"h1">) => {
  return (
    <h1
      className={makeClass(
        className,
        "lvl1",
        "break-words relative text-3xl font-semibold mb-4 md:mb-8",
        "lg:text-4xl",
        (!className || !className.includes("text-")) && HEADER_TEXT_COLOR
      )}
      {...props}
    />
  );
};

/** The component used to render a h2 */
const h2 = ({ className, ...props }: Element<"h2">) => (
  <h2
    className={makeClass(
      "lvl2",
      "break-words relative text-2xl font-normal border-b border-gray-300 pb-2 mb-4 mt-6",
      "md:mb-6",
      "lg:text-3xl lg:mt-8 mb:pb-4",
      "dark:border-gray-700",
      HEADER_TEXT_COLOR,
      className
    )}
    {...props}
  />
);

/** The component used to render a h3 */
const h3 = ({ className, ...props }: Element<"h3">) => (
  <h3
    className={makeClass(
      "lvl3",
      "break-words text-xl relative font-bold mt-6",
      "lg:text-2xl lg:font-semibold",
      HEADER_TEXT_COLOR,
      className
    )}
    {...props}
  />
);

/** The component used to render a h4 */
const h4 = ({ className, ...props }: Element<"h4">) => (
  <h4
    className={makeClass(
      "lvl4",
      "break-words relative text-xl font-semibold mt-8",
      HEADER_TEXT_COLOR,
      className
    )}
    {...props}
  />
);

/** The component used to render a h5 */
const h5 = ({ className, ...props }: Element<"h5">) => (
  <h5
    className={makeClass(
      "lvl5",
      "break-words relative text-lg font-semibold mt-8",
      HEADER_TEXT_COLOR,
      className
    )}
    {...props}
  />
);

/** The component used to render a h6 */
const h6 = ({ className, ...props }: Element<"h6">) => (
  <h6
    className={makeClass(
      "break-words lvl6",
      "relative text-md font-semibold mt-8",
      HEADER_TEXT_COLOR,
      className
    )}
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
      "blockquote bg-gray-200 px-6 py-6 my-8 border-l-4 border-blue-500",
      "dark:bg-gray-800",
      className
    )}
    {...props}
  />
);

/** The component used to render a `code` in a line of text */
const InlineCode = ({ className, ...props }: Element<"code">) => (
  <code
    className={makeClass(
      "text-gray-700 bg-gray-200 rounded",
      "dark:bg-gray-800 dark:text-gray-200",
      className
    )}
    style={{ padding: "2px 6px" }}
    {...props}
  />
);

/** The component used to render an anchor */
const a = React.forwardRef(
  (
    { className = "", href, ...props }: Element<"a">,
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    if (href?.startsWith("http")) {
      return (
        <a
          ref={ref}
          className={makeClass(
            `underline cursor-pointer ${DEFAULT_TEXT_COLOR}`,
            "focus:outline-none focus-visible:ring",
            className
          )}
          href={href}
          {...props}
        />
      );
    }

    return (
      <a
        ref={ref}
        href={
          href?.includes("#") ? href.replace("#", ".html#") : `${href}.html`
        }
        className={makeClass(
          "focus-visible:ring ring-offset-2 focus:outline-none rounded",
          !className.includes("header-link") &&
            `underline cursor-pointer ${DEFAULT_TEXT_COLOR}`,
          className
        )}
        {...props}
      />
    );
  }
);

/** The component used to render an ul */
const ul = ({ className, ...props }: Element<"ul">) => (
  <ul className={makeClass(className, "my-6 ul")} {...props} />
);

const hr = ({ className, ...props }: Element<"hr">) => (
  <hr
    className={makeClass(className, "m-12 border-b-2", "dark:border-gray-700")}
    {...props}
  />
);

/** The component used to render an ol */
const ol = ({ className, ...props }: Element<"ol">) => (
  <ol className={makeClass(className, "my-6 ol")} {...props} />
);

/** The component used to render an block of code */
const code = ({ className, ...props }: Element<"code">) =>
  className?.includes("language") ? (
    <code
      className={makeClass(
        className,
        "text-gray-600 rounded block py-8 px-6 overflow-auto",
        "dark:bg-gray-800"
      )}
      {...props}
    />
  ) : (
    <InlineCode className={className} {...props} />
  );

/** The component used to render a pre */
const pre = ({ className, ...props }: Element<"pre">) => (
  <pre
    className={makeClass(
      className,
      "bg-gray-200 rounded border my-6",
      "dark:bg-gray-800 dark:border-gray-700"
    )}
    style={{
      marginTop: "1.5rem",
      marginBottom: "1.5rem",
    }}
    {...props}
  />
);

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
      "py-2 px-3 border-b border-t",
      "dark:border-gray-800"
    )}
    {...props}
  />
);

const tr = ({ className, ...props }: Element<"tr">) => (
  <tr className={makeClass(className, "tr")} {...props} />
);

const img = ({ className, src, ...props }: Element<"img">) => (
  <img title={props.alt} srcSet={src} {...props} />
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
  img,

  table,
  th,
  tr,
  td,
} as const;

export type Components = typeof components;
