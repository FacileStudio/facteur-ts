import nodemailer from "nodemailer";
/**
 * Builds a {@link MailerConfig} from the suite-wide SMTP_* variables. The
 * default port is 587 when SMTP_PORT is absent or invalid.
 */
export function fromEnv(env = process.env) {
    const port = Number(env.SMTP_PORT);
    return {
        host: env.SMTP_HOST,
        port: Number.isInteger(port) && port > 0 ? port : 587,
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
        from: env.SMTP_FROM ?? "",
    };
}
/**
 * Creates a Mailer that sends over SMTP. Sending without a configured host
 * rejects with a "not configured" error rather than failing silently — the
 * app decides whether that is fatal or a log-and-continue.
 */
export function createMailer(config) {
    let transport;
    const getTransport = () => {
        if (!transport) {
            transport = nodemailer.createTransport({
                host: config.host,
                port: config.port ?? 587,
                secure: config.port === 465,
                auth: config.user
                    ? { user: config.user, pass: config.pass ?? "" }
                    : undefined,
            });
        }
        return transport;
    };
    return {
        async send(message) {
            if (!config.host) {
                throw new Error("mailer: SMTP not configured (SMTP_HOST missing)");
            }
            const text = message.text ?? stripHtml(message.html);
            await getTransport().sendMail({
                from: config.from,
                to: message.to,
                subject: message.subject,
                html: message.html,
                text,
            });
        },
    };
}
/**
 * Creates a Mailer that records every message in memory instead of sending.
 * Tests assert on {@link MemoryMailer.messages}.
 */
export function createMemoryMailer() {
    const sent = [];
    return {
        async send(message) {
            sent.push(message);
        },
        messages() {
            return [...sent];
        },
    };
}
function stripHtml(html) {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
