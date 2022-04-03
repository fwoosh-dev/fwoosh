import * as React from "react";
import { Link } from "react-router-dom";
import { styled } from "./stitches";

export type Element<
  T extends keyof JSX.IntrinsicElements
> = React.PropsWithoutRef<JSX.IntrinsicElements[T]>;

/** The component used to render a h1 */
const h1 = styled("h1", {
  text: "3xl",
  mb: 4,
  color: "$gray11",
  fontWeight: 600,
  scrollMarginTop: "$4",

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
  color: "$gray11",
  fontWeight: 500,
  borderBottom: "1px solid $gray7",
  scrollMarginTop: "$4",

  "@md": {
    mb: 5,
  },
  "@lg": {
    text: "3xl",
    my: 8,
  },
});

/** The component used to render a h3 */
const h3 = styled("h3", {
  text: "xl",
  color: "$gray11",
  mt: 6,
  fontWeight: 500,
  scrollMarginTop: "$4",
});

/** The component used to render a h4 */
const h4 = styled("h4", {
  text: "lg",
  color: "$gray11",
  fontWeight: 700,
  mt: 8,
  scrollMarginTop: "$4",
});

/** The component used to render a h5 */
const h5 = styled("h5", {
  text: "lg",
  color: "$gray11",
  fontWeight: 500,
  mt: 8,
  fontStyle: "italic",
  scrollMarginTop: "$4",
});

/** The component used to render a h6 */
const h6 = styled("h6", {
  fontWeight: 500,
  mt: 8,
  color: "$gray11",
  scrollMarginTop: "$4",
});

/** The component used to render a p */
const p = styled("p", {
  my: 4,
  text: "lg",
  color: "$gray11",
});

/** The component used to render a li */
const li = styled("li", {
  color: "$gray11",
});

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

const CodeBlock = styled("pre", {
  py: 6,
  px: 4,
});

/** The component used to render an block of code */
const code = ({ className, ...props }: Element<"code">) =>
  className && className.includes("language") ? (
    <CodeBlock className={className} {...props} />
  ) : (
    <InlineCode className={className} {...props} />
  );

/** The component used to render a pre */
const pre = styled("pre", {
  borderRadius: 4,
  marginTop: "1.5rem",
  marginBottom: "1.5rem",
  border: "1px solid $gray6",
  textAlign: "left",
  fontWeight: 300,
  color: "$gray10",
  my: 6,
  overflow: "hidden",
});

const Anchor = styled("a", {
  cursor: "pointer",
  color: "$primary10",
  textDecoration: "underline",
});

/** The component used to render an anchor */
const a = React.forwardRef(
  (
    { href = "", className, ...props }: Element<"a">,
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    if (href.startsWith("http")) {
      return <Anchor ref={ref} href={href} {...props} />;
    }

    return (
      <Link to={href}>
        <Anchor ref={ref} {...props} />
      </Link>
    );
  }
);

export interface LazyLoaderProps {
  delay?: number;
}

const LoadingText = styled("div", {
  color: "$gray10",
});

export const Spinner = ({ delay = 250 }: LazyLoaderProps) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  if (!show) {
    return null;
  }

  return <LoadingText>Loading...</LoadingText>;
};

const table = styled("table", {
  my: 8,
  width: "100%",
});

const th = styled("th", {
  pb: 4,
  textAlign: "left",
  fontWeight: 300,
  color: "$gray10",
  text: "sm",
});

const td = styled("td", {
  py: 4,
  color: "$gray11",
  borderBottom: "1px solid",
  borderTop: "1px solid",
  borderColor: "$gray5",
});

const tr = styled("tr");

const hr = styled("hr", {
  my: 12,
  mx: 20,
  borderTop: "none",
  borderBottom: "1px solid $gray6",
  listStyle: "disc",
});

/** The component used to render an ul */
const ul = styled("ul", {
  my: 6,
  listStyle: "disc",
  text: "lg",

  "& li": {
    ml: 8,
  },
});

/** The component used to render an ol */
const ol = styled("ul", {
  my: 6,
  listStyle: "decimal",
  text: "lg",

  "& li": {
    ml: 8,
  },
});

export const SidebarLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "280px 1fr",
  minHeight: "100vh",
  background: "$gray1",
});

export const Logo = styled("div", {
  px: 12,
  py: 6,
});

export const Sidebar = styled("div", {
  borderRight: "1px solid $gray4",
});

export const SidebarTitle = styled("div", {
  text: "2xl",
  fontWeight: 400,
  color: "$gray11",
  flex: 1,
});

export const SidebarSectionTitle = styled("div", {
  height: "$8",
  fontWeight: 500,
  color: "$gray11",
  px: 2,
  display: "flex",
  alignItems: "center",
  mt: 2,
});

export const SidebarItems = styled("ul");

export const SidebarItem = styled("li", {
  height: "$10",
  px: 2,
  display: "flex",
  alignItems: "center",
  color: "$gray10",

  "&:hover": {
    backgroundColor: "$gray2",
  },

  '&[aria-selected="true"]': {
    backgroundColor: "$gray4",
    color: "$gray11",
  },
});

export const Content = styled("div", {
  maxHeight: "100vh",
  overflowY: "auto",
});

export const PageWrapper = styled("div", {
  mt: 16,
  mb: 28,
  mx: "auto",
  maxWidth: "$4xl",
  width: "100%",
});

export const IconButton = styled("button", {
  color: "$gray11",
  height: "$9",
  width: "$9",
  p: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    background: "$gray3",
  },

  "&:active": {
    background: "$gray5",
  },
});

export const SidebarHeader = styled("div", {
  height: "$10",
  display: "flex",
  alignItems: "center",
  gap: 8,
  px: 2,
  my: 4,
  py: 2,
});

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
