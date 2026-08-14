# facteur-ts

The transactional mailer for the [Facile Suite](https://facile.studio) (TypeScript) — the SMTP
plumbing every app that sends confirmations, notifications or resets needs, and none of them
should be re-writing. Published as `@facile/facteur`.

Every TS app in the suite already carries a copy of the same nodemailer ceremony — the
boilerplate's `packages/email` in every fork, a divergent `packages/smtp` in Ardoise — and every
copy re-decided the same questions: what env vars, what happens when SMTP is unset, how tests
avoid a live server. `facteur-ts` is the single answer, plus the in-memory test seam the copies
didn't have. The Go sibling is [facteur](https://github.com/FacileStudio/facteur); both speak
the same `SMTP_*` environment convention, so ops documents one set of variables.

Transport and message shaping only. Templates and send policy (log-and-continue vs fail-closed)
live in the app, not here.

## What it does

- Sends transactional email over SMTP via nodemailer — its only runtime dependency
- Speaks the suite's `SMTP_*` environment convention, identical names to facteur
- Fills an empty `text` from the HTML (tags stripped) so every message carries a plain-text part
- Uses implicit TLS on port 465, STARTTLS on other ports when offered, and plain auth only when
  a username is set
- Builds the transport lazily on first send, so a mailer can be constructed at module load
- Refuses to send when SMTP is not configured — the promise rejects — and leaves the policy
  (fatal or log-and-continue) to the app
- Gives tests an in-memory mailer that records what would have been sent, no transport needed

## Stack

| Layer | Tech |
|---|---|
| Runtime | TypeScript 5.8, `nodemailer` — nothing else |

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
bun add @facile/facteur          # npm
bun add github:FacileStudio/facteur-ts#main   # git, before publish
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

Sending with no `SMTP_HOST` rejects with a "not configured" error — the app decides whether
that is fatal or a log-and-continue. Tests use the in-memory seam:

```ts
import { createMemoryMailer } from "@facile/facteur";

const mailer = createMemoryMailer();
await mailer.send({ to: "a@example.com", subject: "hi", html: "<p>hi</p>" });
mailer.messages(); // recorded messages, in send order
```

## Development

```sh
bun test && bun run build
```

`dist/` is committed so git installs work without a build step; run `bun run build` after
changing `src/`.
