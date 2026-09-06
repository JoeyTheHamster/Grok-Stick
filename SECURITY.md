# Security Policy

## What this project is

Grok Stick is a portable launcher kit for the official Grok CLI. It stores login material (`home/auth.json`, `home/api-key`) on the USB drive by design.

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

Use [GitHub private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) on this repository, or contact the owner via GitHub.

Include:

- What you found and how to reproduce it
- Affected files or launchers (`grok`, `grok.cmd`, `fetch-all`, env helpers)
- Whether credentials on the stick can be read, overwritten, or sent somewhere unexpected

## Scope

In scope:

- Launchers writing outside the stick (`GROK_HOME` leaking to the host)
- Secrets in the generated zip or this repo
- Supply-chain issues in how binaries are fetched (URL, checksums, unexpected hosts)

Out of scope:

- Bugs in the official Grok CLI itself — report those to xAI
- Someone copying `home/auth.json` off a stick they already have physical access to (treat the drive like a password manager)

We aim to respond to reports within a few days.
