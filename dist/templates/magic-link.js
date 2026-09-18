import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Text } from "@react-email/components";
import { Layout } from "../components/layout.js";
export function MagicLinkEmail({ magicLink }) {
    return (_jsxs(Layout, { children: [_jsx(Text, { className: "text-xl font-bold text-primary mb-4", children: "Sign in to Facile" }), _jsx(Text, { className: "text-base text-text mb-6", children: "Click the button below to sign in securely with your magic link." }), _jsx(Button, { href: magicLink, className: "bg-primary text-white px-6 py-2 rounded font-semibold shadow transition mb-6", children: "Sign in" }), _jsx(Text, { className: "text-xs text-secondary", children: "If you did not request this, you can safely ignore this email." })] }));
}
