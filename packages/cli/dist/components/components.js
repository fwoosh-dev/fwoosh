import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import makeClass from "clsx";
/** The component used to render a h1 */
const h1 = ({ className, ...props }) => (_jsx("h1", Object.assign({ className: makeClass(className, "lvl1") }, props), void 0));
/** The component used to render a h2 */
const h2 = ({ className, ...props }) => (_jsx("h2", Object.assign({ className: makeClass("lvl2", className) }, props), void 0));
/** The component used to render a h3 */
const h3 = ({ className, ...props }) => (_jsx("h3", Object.assign({ className: makeClass("lvl3", className) }, props), void 0));
/** The component used to render a h4 */
const h4 = ({ className, ...props }) => (_jsx("h4", Object.assign({ className: makeClass("lvl4", className) }, props), void 0));
/** The component used to render a h5 */
const h5 = ({ className, ...props }) => (_jsx("h5", Object.assign({ className: makeClass("lvl5", className) }, props), void 0));
/** The component used to render a h6 */
const h6 = ({ className, ...props }) => (_jsx("h6", Object.assign({ className: makeClass("lvl6", className) }, props), void 0));
/** The component used to render a `code` in a line of text */
const InlineCode = (props) => (_jsx("code", Object.assign({ style: { padding: "2px 6px", background: "#d0d0d0" } }, props), void 0));
/** The component used to render an block of code */
const code = ({ className, style, ...props }) => className && className.includes("language") ? (_jsx("code", Object.assign({}, props, { style: {
        padding: "12px 20px",
        display: "block",
        overflow: "auto",
        borderRadius: 4,
        ...style,
    } }), void 0)) : (_jsx(InlineCode, Object.assign({ className: className, style: style }, props), void 0));
/** The component used to render a pre */
const pre = ({ style, ...props }) => (_jsx("pre", Object.assign({ style: {
        ...style,
        border: '1px solid gray',
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
    } }, props), void 0));
/** The component used to render an anchor */
const a = React.forwardRef(({ href = "", ...props }, ref) => {
    if (href.startsWith("http")) {
        return _jsx("a", Object.assign({ ref: ref, href: href }, props), void 0);
    }
    return (_jsx("a", Object.assign({ ref: ref, href: href.includes("#") ? href.replace("#", ".html#") : `${href}.html` }, props), void 0));
});
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
};
