import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import makeClass from "clsx";
const DEFAULT_SPACING = "my-4";
const DEFAULT_TEXT_COLOR = "text-gray-800 dark:text-gray-300";
const HEADER_TEXT_COLOR = "text-gray-900 dark:text-gray-200";
/** The component used to render a h1 */
const h1 = ({ className, ...props }) => {
    return (_jsx("h1", Object.assign({ className: makeClass(className, "lvl1", "break-words relative text-3xl font-semibold mb-4 md:mb-8", "lg:text-4xl", (!className || !className.includes("text-")) && HEADER_TEXT_COLOR) }, props), void 0));
};
/** The component used to render a h2 */
const h2 = ({ className, ...props }) => (_jsx("h2", Object.assign({ className: makeClass("lvl2", "break-words relative text-2xl font-normal border-b border-gray-300 pb-2 mb-4 mt-6", "md:mb-6", "lg:text-3xl lg:mt-8 mb:pb-4", "dark:border-gray-700", HEADER_TEXT_COLOR, className) }, props), void 0));
/** The component used to render a h3 */
const h3 = ({ className, ...props }) => (_jsx("h3", Object.assign({ className: makeClass("lvl3", "break-words text-xl relative font-bold mt-6", "lg:text-2xl lg:font-semibold", HEADER_TEXT_COLOR, className) }, props), void 0));
/** The component used to render a h4 */
const h4 = ({ className, ...props }) => (_jsx("h4", Object.assign({ className: makeClass("lvl4", "break-words relative text-xl font-semibold mt-8", HEADER_TEXT_COLOR, className) }, props), void 0));
/** The component used to render a h5 */
const h5 = ({ className, ...props }) => (_jsx("h5", Object.assign({ className: makeClass("lvl5", "break-words relative text-lg font-semibold mt-8", HEADER_TEXT_COLOR, className) }, props), void 0));
/** The component used to render a h6 */
const h6 = ({ className, ...props }) => (_jsx("h6", Object.assign({ className: makeClass("break-words lvl6", "relative text-md font-semibold mt-8", HEADER_TEXT_COLOR, className) }, props), void 0));
/** The component used to render a p */
const p = ({ className, ...props }) => (_jsx("p", Object.assign({ className: makeClass(DEFAULT_SPACING, className, DEFAULT_TEXT_COLOR) }, props), void 0));
/** The component used to render a li */
const li = ({ className, ...props }) => (_jsx("li", Object.assign({ className: makeClass(DEFAULT_SPACING, className, DEFAULT_TEXT_COLOR) }, props), void 0));
/** The component used to render a blockquote */
const blockquote = ({ className, ...props }) => (_jsx("blockquote", Object.assign({ className: makeClass("blockquote bg-gray-200 px-6 py-6 my-8 border-l-4 border-primary-500", "dark:bg-gray-800", className) }, props), void 0));
/** The component used to render a `code` in a line of text */
const inlineCode = ({ className, ...props }) => (_jsx("code", Object.assign({ className: makeClass("text-gray-700 bg-gray-200 rounded", "dark:bg-gray-800 dark:text-gray-200", className), style: { padding: "2px 6px" } }, props), void 0));
/** The component used to render an anchor */
const a = React.forwardRef(({ className = "", href, ...props }, ref) => {
    if (href?.startsWith("http")) {
        return (_jsx("a", Object.assign({ ref: ref, className: makeClass(`underline cursor-pointer ${DEFAULT_TEXT_COLOR}`, "focus:outline-none focus-visible:ring", className), href: href }, props), void 0));
    }
    return (_jsx("a", Object.assign({ ref: ref, href: href, className: makeClass("focus-visible:ring ring-offset-2 focus:outline-none rounded", !className.includes("header-link") &&
            `underline cursor-pointer ${DEFAULT_TEXT_COLOR}`, className) }, props), void 0));
});
/** The component used to render an ul */
const ul = ({ className, ...props }) => (_jsx("ul", Object.assign({ className: makeClass(className, "my-6 ul") }, props), void 0));
const hr = ({ className, ...props }) => (_jsx("hr", Object.assign({ className: makeClass(className, "m-12 border-b-2", "dark:border-gray-700") }, props), void 0));
/** The component used to render an ol */
const ol = ({ className, ...props }) => (_jsx("ol", Object.assign({ className: makeClass(className, "my-6 ol") }, props), void 0));
/** The component used to render an block of code */
const code = ({ className, ...props }) => (_jsx("code", Object.assign({ className: makeClass(className, "text-gray-600 rounded block py-8 px-6 overflow-auto", "dark:bg-gray-800") }, props), void 0));
/** The component used to render a pre */
const pre = ({ className, ...props }) => (_jsx("pre", Object.assign({ className: makeClass(className, "bg-gray-200 rounded border my-6", "dark:bg-gray-800 dark:border-gray-700"), style: {
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
    } }, props), void 0));
const table = ({ className, ...props }) => (_jsx("div", Object.assign({ className: "overflow-auto" }, { children: _jsx("table", Object.assign({ className: makeClass(className, DEFAULT_TEXT_COLOR, "w-full my-6") }, props), void 0) }), void 0));
const th = ({ className, ...props }) => (_jsx("th", Object.assign({ className: makeClass(className, "pb-4 px-3 text-left font-semibold") }, props), void 0));
const td = ({ className, ...props }) => (_jsx("td", Object.assign({ className: makeClass(className, "py-2 px-3 border-b border-t", "dark:border-gray-800") }, props), void 0));
const tr = ({ className, ...props }) => (_jsx("tr", Object.assign({ className: makeClass(className, "tr") }, props), void 0));
const img = ({ className, src, ...props }) => (_jsx("img", Object.assign({ title: props.alt, srcSet: src }, props), void 0));
export const components = {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    hr,
    p,
    inlineCode,
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
};
