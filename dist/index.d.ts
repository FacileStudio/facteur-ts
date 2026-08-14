/**
 * SMTP connection settings for one mailer. Mirrors the suite-wide SMTP_*
 * environment convention (see {@link fromEnv}) so ops documents one set of
 * variables for both the TypeScript and Go implementations.
 */
export interface MailerConfig {
    host?: string;
    port?: number;
    user?: string;
    pass?: string;
    from: string;
}
/** One outgoing email. */
export interface Message {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
}
/** The transport seam; a mailer's app-facing type. */
export interface Mailer {
    send(message: Message): Promise<void>;
}
export interface MemoryMailer extends Mailer {
    /** Recorded messages, in send order. */
    messages(): Message[];
}
/**
 * Builds a {@link MailerConfig} from the suite-wide SMTP_* variables. The
 * default port is 587 when SMTP_PORT is absent or invalid.
 */
export declare function fromEnv(env?: Record<string, string | undefined>): MailerConfig;
/**
 * Creates a Mailer that sends over SMTP. Sending without a configured host
 * rejects with a "not configured" error rather than failing silently — the
 * app decides whether that is fatal or a log-and-continue.
 */
export declare function createMailer(config: MailerConfig): Mailer;
/**
 * Creates a Mailer that records every message in memory instead of sending.
 * Tests assert on {@link MemoryMailer.messages}.
 */
export declare function createMemoryMailer(): MemoryMailer;
