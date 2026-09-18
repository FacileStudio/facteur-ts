import { WelcomeEmail, type WelcomeProps } from "./welcome.js";
import { MagicLinkEmail, type MagicLinkProps } from "./magic-link.js";
import { PasswordResetEmail, type PasswordResetProps } from "./password-reset.js";
export declare const templates: {
    readonly welcome: typeof WelcomeEmail;
    readonly "magic-link": typeof MagicLinkEmail;
    readonly "password-reset": typeof PasswordResetEmail;
};
export interface TemplateProps {
    welcome: WelcomeProps;
    "magic-link": MagicLinkProps;
    "password-reset": PasswordResetProps;
}
export type TemplateName = keyof typeof templates;
export { WelcomeEmail, MagicLinkEmail, PasswordResetEmail };
export type { WelcomeProps, MagicLinkProps, PasswordResetProps };
