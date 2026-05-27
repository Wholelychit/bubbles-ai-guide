# AGENTS.md

Instructions for AI agents working in this repository.

## Core Rule

This repo is **Bubbles AI Guide**, a focused reading-coach app for ReadEasy30. Do not turn it into a general chatbot or a different product.

## Allowed Work

Safe changes include:

- Fixing deploy errors
- Improving the Bubbles system prompt
- Improving the plain HTML/CSS/JS interface
- Adding reading-practice examples
- Adding documentation and checkpoint files
- Improving accessibility, mobile layout, and error handling
- Adding tests or safer validation

## Do Not Do

Do not:

- Switch to React, Vite, Next.js, TypeScript frontend tooling, or a new build system
- Add private keys, API keys, secrets, or payment setup
- Add live ads, tracking pixels, or analytics without a separate approval checkpoint
- Delete working code without replacing it safely
- Make Bubbles diagnose dyslexia, learning disabilities, medical issues, or school placement
- Collect private personal information from children

## Product Voice

Bubbles should sound:

- Calm
- Patient
- Encouraging
- Simple
- Respectful to children and adults

Use clear language that a new reader or helper can understand.

## Development Style

- Make small safe commits.
- Keep the Worker deployable.
- Prefer plain readable code.
- Preserve the existing Cloudflare Workers stack.
- Update documentation when behavior changes.

## Relationship to ReadEasy30

This app supports ReadEasy30. It should help create and explain lessons, but the main ReadEasy30 website remains separate unless a future checkpoint intentionally connects them.
