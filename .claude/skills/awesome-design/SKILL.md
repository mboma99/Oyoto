---
name: awesome-design
description: Library of 73 DESIGN.md design-system analyses of real sites (Linear, Vercel, Stripe, Apple, Notion, Figma, etc.). Use when the user wants a page or component to look/feel like a named brand or site, asks for design inspiration or a reference design language, or wants to adopt a DESIGN.md for the project.
---

# Awesome DESIGN.md

Source: https://github.com/VoltAgent/awesome-design-md (MIT, see LICENSE).

Each folder in `designs/<site>/DESIGN.md` is a plain-markdown design system (colors, type, spacing, components, rules) extracted from a real website.

## How to use

1. List available references: `ls .claude/skills/awesome-design/designs/`
2. Pick the one(s) matching the user's request (a named brand, or the closest vibe). If unclear, suggest 2–3 candidates.
3. Read only the chosen `DESIGN.md` file(s) — do not load the whole library.
4. Apply its tokens, typography, spacing and component rules to the code you write. Adapt to this project's existing stack and tokens in `src/app/globals.css`; don't copy brand logos or trademarked assets.
5. If the user wants it adopted project-wide, copy it to the repo root as `DESIGN.md`.
