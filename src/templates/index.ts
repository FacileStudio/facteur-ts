import { WelcomeEmail, type WelcomeProps } from "./welcome.js";
import { MagicLinkEmail, type MagicLinkProps } from "./magic-link.js";
import { PasswordResetEmail, type PasswordResetProps } from "./password-reset.js";

export const templates = {
  welcome: WelcomeEmail,
  "magic-link": MagicLinkEmail,
  "password-reset": PasswordResetEmail,
} as const;

export interface TemplateProps {
  welcome: WelcomeProps;
  "magic-link": MagicLinkProps;
  "password-reset": PasswordResetProps;
}

export type TemplateName = keyof typeof templates;

export { WelcomeEmail, MagicLinkEmail, PasswordResetEmail };
export type { WelcomeProps, MagicLinkProps, PasswordResetProps };
