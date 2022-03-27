import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from "react";
export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch() { }
    render() {
        if (this.state.hasError) {
            return _jsx("h1", { children: "Something went wrong!" }, void 0);
        }
        return this.props.children;
    }
}
