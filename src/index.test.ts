import { describe, expect, test } from "bun:test";
import { createMailer, createMemoryMailer, fromEnv } from "./index";

describe("memory mailer", () => {
  test("records sent messages in order", async () => {
    const mailer = createMemoryMailer();
    await mailer.send({
      to: "a@example.com",
      subject: "hello",
      html: "<p>hi</p>",
    });
    await mailer.send({
      to: "b@example.com",
      subject: "again",
      html: "<p>yo</p>",
      text: "yo",
    });

    const messages = mailer.messages();
    expect(messages).toHaveLength(2);
    expect(messages[0].subject).toBe("hello");
    expect(messages[1].to).toBe("b@example.com");
  });
});

describe("smtp mailer", () => {
  test("rejects without a configured host", async () => {
    const mailer = createMailer({ from: "noreply@facile.studio" });
    await expect(
      mailer.send({ to: "a@example.com", subject: "x", html: "<p>x</p>" }),
    ).rejects.toThrow("not configured");
  });
});

describe("fromEnv", () => {
  test("reads suite-wide SMTP_* variables with default port", () => {
    const cfg = fromEnv({
      SMTP_HOST: "smtp.example.com",
      SMTP_USER: "u",
      SMTP_PASS: "p",
      SMTP_FROM: "noreply@facile.studio",
    });
    expect(cfg.host).toBe("smtp.example.com");
    expect(cfg.port).toBe(587);
    expect(cfg.user).toBe("u");
    expect(cfg.from).toBe("noreply@facile.studio");
  });

  test("falls back to 587 on invalid port", () => {
    expect(fromEnv({ SMTP_PORT: "notaport" }).port).toBe(587);
  });
});
