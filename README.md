# Bubbles AI Guide

Bubbles AI Guide is a small Cloudflare Workers AI chat app for ReadEasy30. It acts as a calm reading coach that can create short lessons, vocabulary help, simple questions, and parent/helper tips.

## Current Purpose

This repo is for the Bubbles reading-coach guide, not a general AI chatbot.

Bubbles should help:

- Children practicing early reading
- Parents and helpers supporting a reader
- Adult beginners who want simple, respectful reading practice
- ESL learners who need clear vocabulary and short passages
- ReadEasy30 lesson creation and support workflows

## Tech Stack

- Cloudflare Workers
- Cloudflare Workers AI
- TypeScript
- Plain HTML, CSS, and JavaScript in `public/`
- Wrangler for local development and deployment

Do not switch this project to React, Vite, Next.js, or another framework unless that decision is made deliberately in a future checkpoint.

## Project Structure

```text
/
├── public/
│   ├── index.html      # Bubbles chat interface
│   └── chat.js         # Frontend chat behavior
├── src/
│   ├── index.ts        # Worker API and Bubbles system prompt
│   └── types.ts        # Worker types
├── package.json        # Scripts and dependencies
├── wrangler.jsonc      # Cloudflare Worker config
└── README.md
```

## Main Scripts

```bash
npm install
npm run check
npm run dev
npm run deploy
```

`npm run check` runs TypeScript checking and a Wrangler dry-run deploy.

## Bubbles Behavior Rules

Bubbles should:

- Use kind, calm, plain language
- Keep most answers short
- Help with reading practice, vocabulary, questions, and helper tips
- Encourage slow reading and rereading
- Avoid collecting private information about children
- Avoid diagnosis or medical/school-placement claims

## Safe Production Build Queue

1. Keep the Worker deployable.
2. Keep the interface simple and mobile-friendly.
3. Improve the Bubbles system prompt slowly and carefully.
4. Add example lesson templates.
5. Add safety copy for parents/helpers.
6. Add testing and deployment notes.
7. Connect this guide back to ReadEasy30 only when stable.

## Current Checkpoint

- Repo confirmed: `Wholelychit/bubbles-ai-guide`
- Default branch: `main`
- Worker file repaired from broken template text
- UI branded as Bubbles AI Guide
- Frontend script hardened to avoid unsafe HTML injection
- Project documentation added for future AI/Codex work

## Notes for Gerry

This is the Bubbles AI side project. Keep it focused. It should support ReadEasy30, not replace the main ReadEasy30 website.
