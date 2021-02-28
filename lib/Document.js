import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export const Document = ({ children, frontMatter }) => {
    return (_jsx(_Fragment, { children: _jsxs("html", Object.assign({ lang: "en" }, { children: [_jsxs("head", { children: [_jsx("link", { href: "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css", rel: "stylesheet" }, void 0),
                        _jsx("meta", { charSet: "UTF-8" }, void 0),
                        _jsx("meta", { "http-equiv": "X-UA-Compatible", content: "IE=edge" }, void 0),
                        _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }, void 0),
                        _jsx("title", { children: frontMatter.title || "Document" }, void 0)] }, void 0),
                _jsx("body", { children: children }, void 0)] }), void 0) }, void 0));
};
