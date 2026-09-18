import { describe, expect, it } from "bun:test";
import { renderTemplate } from "./render.js";

describe("renderTemplate", () => {
  it("renders welcome email to html and plain text", async () => {
    const rendered = await renderTemplate("welcome", { name: "Alice" });

    expect(rendered.html).toContain("Welcome to Facile");
    expect(rendered.html).toContain("Alice");
    expect(rendered.text).toContain("Hi, Alice");
    expect(rendered.text).toContain("Welcome to Facile");
  });

  it("renders magic link email with link href", async () => {
    const rendered = await renderTemplate("magic-link", {
      magicLink: "https://facile.studio/login?token=abc",
    });

    expect(rendered.html).toContain("https://facile.studio/login?token=abc");
    expect(rendered.text).toContain("Sign in to Facile");
  });

  it("renders password reset email with reset link", async () => {
    const rendered = await renderTemplate("password-reset", {
      resetLink: "https://facile.studio/reset?token=xyz",
    });

    expect(rendered.html).toContain("https://facile.studio/reset?token=xyz");
    expect(rendered.text).toContain("Reset your password");
  });
});
