import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Story } from "./components/Story";
import { Docs } from "./components/Docs";
export const App = () => {
    return (_jsx(BrowserRouter, { children: _jsx(Routes, { children: _jsxs(Route, Object.assign({ path: "/" }, { children: [_jsx(Route, { index: true }, void 0),
                    _jsx(Route, Object.assign({ path: "story" }, { children: _jsx(Route, { path: ":storyId", element: _jsx(Story, {}, void 0) }, void 0) }), void 0),
                    _jsx(Route, Object.assign({ path: "docs", element: _jsx(Docs, {}, void 0) }, { children: _jsx(Route, { path: ":storyId", element: _jsx(Story, {}, void 0) }, void 0) }), void 0)] }), void 0) }, void 0) }, void 0));
};
