import { WelcomeEmail } from "./welcome.js";
import { MagicLinkEmail } from "./magic-link.js";
import { PasswordResetEmail } from "./password-reset.js";
export const templates = {
    welcome: WelcomeEmail,
    "magic-link": MagicLinkEmail,
    "password-reset": PasswordResetEmail,
};
export { WelcomeEmail, MagicLinkEmail, PasswordResetEmail };
