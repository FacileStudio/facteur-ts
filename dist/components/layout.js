import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Container, Head, Html, Tailwind } from "@react-email/components";
import { tailwindConfig } from "../theme.js";
export function Layout({ children }) {
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Tailwind, { config: tailwindConfig, children: _jsx(Body, { className: "bg-background font-sans", children: _jsx(Container, { className: "max-w-lg mx-auto bg-white rounded shadow p-8 border-border border-8", children: children }) }) })] }));
}
