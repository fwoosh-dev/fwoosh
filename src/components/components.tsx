import React from "react";
import makeClass from "clsx";

export type Element<
  T extends keyof JSX.IntrinsicElements
> = React.PropsWithoutRef<JSX.IntrinsicElements[T]>;

/** The component used to render a h1 */
const h1 = ({ className, ...props }: Element<"h1">) => (
  <h1 className={makeClass(className, "lvl1")} {...props} />
);

/** The component used to render a h2 */
const h2 = ({ className, ...props }: Element<"h2">) => (
  <h2 className={makeClass("lvl2", className)} {...props} />
);

/** The component used to render a h3 */
const h3 = ({ className, ...props }: Element<"h3">) => (
  <h3 className={makeClass("lvl3", className)} {...props} />
);

/** The component used to render a h4 */
const h4 = ({ className, ...props }: Element<"h4">) => (
  <h4 className={makeClass("lvl4", className)} {...props} />
);

/** The component used to render a h5 */
const h5 = ({ className, ...props }: Element<"h5">) => (
  <h5 className={makeClass("lvl5", className)} {...props} />
);

/** The component used to render a h6 */
const h6 = ({ className, ...props }: Element<"h6">) => (
  <h6 className={makeClass("lvl6", className)} {...props} />
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
const pre = ({ style, ...props }: Element<"pre">) => (
  <pre
    style={{
      ...style,
      border: '1px solid gray',
      marginTop: "1.5rem",
      marginBottom: "1.5rem",
    }}
    {...props}
  />
);

/** The component used to render an anchor */
const a = React.forwardRef(
  (
    { href = "", ...props }: Element<"a">,
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    if (href.startsWith("http")) {
      return <a ref={ref} href={href} {...props} />;
    }

    return (
      <a
        ref={ref}
        href={href.includes("#") ? href.replace("#", ".html#") : `${href}.html`}
        {...props}
      />
    );
  }
);

export const components = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr: "hr",
  p: "p",
  code,
  pre,
  a,
  ul: "ul",
  ol: "ol",
  li: "li",
  blockquote: "blockquote",
  img: "img",

  table: "table",
  th: "th",
  tr: "tr",
  td: "td",
} as const;

export type Components = typeof components;
