import React from "react";
import makeClass from "clsx";
import { tw } from "twind";

export type Element<
  T extends keyof JSX.IntrinsicElements
> = React.PropsWithoutRef<JSX.IntrinsicElements[T]>;

const DEFAULT_SPACING = "my-4";
const DEFAULT_TEXT_COLOR = tw`text(gray-800 dark:gray-300)`;
const HEADER_TEXT_COLOR = tw`text(gray-900 dark:gray-200)`;

/** The component used to render a h1 */
const h1 = ({ className, ...props }: Element<"h1">) => {
  return (
    <h1
      className={makeClass(
        className,
        "lvl1",
        tw`
          break-words
          relative
          text(3xl lg:4xl)
          font-semibold
          mb(4 md:8)
        `,
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
      tw`
        break-words
        relative
        text(2xl lg:3xl)
        font-normal
        border(b gray-300 dark:gray-700)
        pb(2 md:4)
        mb(4 md:6)
        mt(6 lg:8)
      `,
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
      tw`
        break-words
        text(xl lg:2xl)
        relative
        font(bold lg:semibold)
        mt-6
      `,
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
      tw`break-words relative text-xl font-semibold mt-8`,
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
      tw`break-words relative text-lg font-semibold mt-8`,
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
      "lvl6",
      tw`break-words relative text-md font-semibold mt-8`,
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
      "blockquote",
      tw`bg(gray-200 dark:gray-800) px-6 py-6 my-8 border(l-4 blue-500)`,
      className
    )}
    {...props}
  />
);

/** The component used to render a `code` in a line of text */
const InlineCode = ({ className, ...props }: Element<"code">) => (
  <code
    className={makeClass(
      className,
      tw`rounded text(gray-700 dark:gray-200) bg(gray-200 dark:gray-700)`
    )}
    style={{ padding: "2px 6px" }}
    {...props}
  />
);

const linkStyles = tw`cursor-pointer text(blue-500 dark:blue-400) focus-visible:ring ring-offset-2 focus:outline-none rounded`;

/** The component used to render an anchor */
const a = React.forwardRef(
  (
    { className = "", href = "", ...props }: Element<"a">,
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    if (href.startsWith("http")) {
      return (
        <a
          ref={ref}
          className={makeClass(linkStyles, className)}
          href={href}
          {...props}
        />
      );
    }

    return (
      <a
        ref={ref}
        href={href.includes("#") ? href.replace("#", ".html#") : `${href}.html`}
        className={makeClass(
          className,
          linkStyles,
          !className.includes("header-link") && "hover:underline"
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
    className={makeClass(className, tw`m-12 border(b-2 dark:gray-700)`)}
    {...props}
  />
);

/** The component used to render an ol */
const ol = ({ className, ...props }: Element<"ol">) => (
  <ol className={makeClass(className, "my-6 ol")} {...props} />
);

/** The component used to render an block of code */
const code = ({ className, ...props }: Element<"code">) =>
  className && className.includes("language") ? (
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
    className={makeClass(className, "rounded border dark:border-gray-700 my-6")}
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
    className={makeClass(className, tw`py-2 px-3 border(b t dark:gray-800)`)}
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
