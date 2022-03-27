import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export const Spinner = ({ delay = 250 }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setShow(true), delay);
        return () => clearTimeout(timeout);
    }, [delay]);
    if (!show) {
        return null;
    }
    return _jsx("div", { children: "Loading..." }, void 0);
};
