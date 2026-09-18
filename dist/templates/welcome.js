import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text } from "@react-email/components";
import { Layout } from "../components/layout.js";
export function WelcomeEmail({ name }) {
    return (_jsxs(Layout, { children: [_jsx(Text, { className: "text-2xl font-bold text-primary mb-2", children: "Welcome to Facile" }), _jsxs(Text, { className: "text-base text-secondary mb-4", children: ["Hi, ", name] }), _jsx(Text, { className: "text-base text-text mb-6", children: "Thank you for registering. We are excited to have you on board." }), _jsx(Text, { className: "text-sm text-secondary", children: "If you have any questions, just reply to this email." })] }));
}
