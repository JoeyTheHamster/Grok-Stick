# Contributing to Grok Stick

Thanks for helping. Keep changes small and focused.

## Ground rules

- Do not vendor or modify the official Grok CLI binary. Launchers only fetch it from xAI.
- Do not commit secrets, API keys, `home/auth.json`, or `.env` files.
- Do not commit build output (`.vercel/output`, `dist`, `node_modules`).
- Prefer product language in user-facing copy. The kit is a portable wrapper, not a fork of Grok.

## Setup

```bash
npm install
npm run dev
```

Before opening a pull request:

```bash
npm run lint
npm run typecheck
npm run test
```

## Pull requests

1. Branch from `main`.
2. One concern per PR.
3. Update the kit templates under `src/lib/kit/templates/` if launcher behavior changes — and keep `src/lib/kit/templates/README.txt` in sync.
4. Describe what you changed and how you verified it (which OS, first-run vs cached binary).

Questions? Open an issue first if the change is large.
