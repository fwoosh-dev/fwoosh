import * as React from "react";
export default class ErrorBoundary extends React.Component<{}, {
    hasError: boolean;
}> {
    constructor(props: any);
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(): void;
    render(): React.ReactNode;
}
