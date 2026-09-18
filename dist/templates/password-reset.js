import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Text } from "@react-email/components";
import { Layout } from "../components/layout.js";
export function PasswordResetEmail({ resetLink }) {
    return (_jsxs(Layout, { children: [_jsx(Text, { className: "text-xl font-bold text-primary mb-4", children: "Reset your password" }), _jsx(Text, { className: "text-base text-text mb-6", children: "Click the button below to reset your password. If you did not request a password reset, you can ignore this email." }), _jsx(Button, { href: resetLink, className: "bg-primary text-white px-6 py-2 rounded font-semibold shadow transition mb-6", children: "Reset Password" }), _jsx(Text, { className: "text-xs text-secondary", children: "This link will expire in 1 hour for your security." })] }));
}
