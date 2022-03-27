import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { stories } from "@fwoosh/app/stories";
import { Outlet, Link } from "react-router-dom";
export const Docs = () => {
    return (_jsxs("div", Object.assign({ style: { display: "grid", gridTemplateColumns: "200px 1fr" } }, { children: [_jsx("ul", Object.assign({ style: { display: "flex", flexDirection: "column", gap: 8 } }, { children: Object.values(stories).map((story) => (_jsx(Link, Object.assign({ to: `/docs/${story.slug}` }, { children: story.title }), story.slug))) }), void 0),
            _jsx(Outlet, {}, void 0)] }), void 0));
};
