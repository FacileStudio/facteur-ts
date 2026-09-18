import * as fs from "node:fs/promises";
import * as path from "node:path";
import { renderTemplate } from "../src/render.js";

const goTemplatesDir =
  process.env.OUT_DIR ??
  path.resolve(import.meta.dir, "../../facteur/templates");

async function exportTemplates(): Promise<void> {
  await fs.mkdir(goTemplatesDir, { recursive: true });

  const templatesToExport = [
    {
      name: "welcome" as const,
      props: { name: "{{.Name}}" },
    },
    {
      name: "magic-link" as const,
      props: { magicLink: "{{.MagicLink}}" },
    },
    {
      name: "password-reset" as const,
      props: { resetLink: "{{.ResetLink}}" },
    },
  ];

  for (const t of templatesToExport) {
    const rendered = await renderTemplate(t.name, t.props as any);
    const htmlPath = path.join(goTemplatesDir, `${t.name}.html`);
    const txtPath = path.join(goTemplatesDir, `${t.name}.txt`);
    await fs.writeFile(htmlPath, rendered.html, "utf-8");
    await fs.writeFile(txtPath, rendered.text, "utf-8");
  }
}

await exportTemplates();
