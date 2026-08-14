# facteur-ts

Transactional mailer for the Facile Suite (TypeScript) — confirmations,
notifications, resets. Published as `@facile/facteur`; `nodemailer` is the only
runtime dependency.

The Go sibling is [facteur](https://github.com/FacileStudio/facteur). Both
implementations speak the same `SMTP_*` environment convention, so ops documents
one set of variables.

Transport and message shaping only. Templates and send policy (log-and-continue
vs fail-closed) live in the app, not here.

## Environment

| Variable | Meaning |
|---|---|
| `SMTP_HOST` | SMTP server hostname. Absent ⇒ send rejects |
| `SMTP_PORT` | Port (default 587; 465 gets implicit TLS, otherwise STARTTLS) |
| `SMTP_USER` | Username (optional; empty = no auth) |
| `SMTP_PASS` | Password |
| `SMTP_FROM` | From address, e.g. `noreply@facile.studio` |

## Install

```sh
bun add @facile/facteur          # once published to npm
bun add github:FacileStudio/facteur-ts#main   # from git, before publish
```

## Usage

```ts
import { createMailer, fromEnv } from "@facile/facteur";

const mailer = createMailer(fromEnv());

await mailer.send({
  to: "someone@example.com",
  subject: "Your confirmation code",
  html: "<p>Code: <strong>482913</strong></p>",
});
```

Sending with no `SMTP_HOST` rejects with a "not configured" error. Tests use
the in-memory seam, which needs no transport:

```ts
import { createMemoryMailer } from "@facile/facteur";

const mailer = createMemoryMailer();
await mailer.send({ to: "a@example.com", subject: "hi", html: "<p>hi</p>" });
mailer.messages(); // recorded messages, in send order
```

An empty `text` is filled from the HTML (tags stripped) so every message
carries a plain-text part.

## Development

```sh
bun test && bun run build
```

`dist/` is committed so git installs work without a build step; run
`bun run build` after changing `src/`.
