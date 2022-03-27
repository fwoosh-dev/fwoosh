import { jsx as _jsx } from "react/jsx-runtime";
import React, { Suspense } from "react";
// @ts-ignore
import { stories } from "@fwoosh/app/generated/generated-list";
import { useParams } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import { Spinner } from "./Spinner";
export const Story = () => {
    const params = useParams();
    return (_jsx(ErrorBoundary, { children: _jsx(Suspense, Object.assign({ fallback: _jsx(Spinner, { delay: 300 }, void 0) }, { children: React.createElement(stories[params.storyId]) }), void 0) }, void 0));
};
