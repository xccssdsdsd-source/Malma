# CLAUDE.md — Frontend Website Rules

## Response Style
- Reply minimally. No explanations unless asked. Code + one-line status only.
- Format: action taken → what's next. Nothing else.
- Never describe what you're about to do — just do it.

## Project Prompt
- If a project-specific prompt is provided alongside this file, treat it as the primary directive.
- It extends and overrides these defaults where they conflict.

## Code Output Rules (no quality impact)
- No comments in HTML/CSS/JS — zero exceptions.
- No `console.log`, no dead code, no unused classes.
- No wrapper divs unless structurally required.
- Collapse whitespace in repetitive HTML (e.g. nav links, card lists) — one line per item.
- No `alt=""` on decorative images. Use `role="presentation"` once if needed, not per-element.
- Tailwind: no duplicate utility classes. No `class=""` on elements with no classes.
- JS: arrow functions, no `var`, no semicolons unless required, single quotes.

## Start of Every Session
- Invoke the `frontend-design` skill before writing any frontend code.

## Reference Images
- If provided: match layout, spacing, typography, colors exactly. Use placeholders (`https://placehold.co/WxH`). Do not improve or add.
- If none: design from scratch with high craft.
- Screenshot → compare → fix → repeat. Minimum 2 rounds. Stop only when no visible diff remains.

## Server & Screenshots
- Always serve on localhost via `node serve.mjs` (port 3000). Never screenshot `file:///`.
- Screenshot: `node screenshot.mjs http://localhost:3000` → saved to `./temporary screenshots/screenshot-N.png`
- After screenshot, read PNG and compare precisely (px values, hex colors, spacing).

## Output Defaults
- Single `index.html`, all styles inline
- Tailwind via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Mobile-first responsive

## Brand Assets
- Always check `brand_assets/` first. Use real logos/colors if present — no placeholders.

## Design Rules
- No default Tailwind blue/indigo as primary. Derive custom brand color.
- Shadows: layered, color-tinted, low opacity — no flat `shadow-md`.
- Typography: display/serif + clean sans pair. Tight tracking on headings (`-0.03em`), generous body line-height (`1.7`).
- Every clickable element: hover + focus-visible + active states.
- Animate only `transform` and `opacity`. Never `transition-all`.
- Images: gradient overlay (`bg-gradient-to-t from-black/60`) + color treatment via `mix-blend-multiply`.

## Hard Rules
- Do not add content not in the reference
- Do not "improve" a reference — match it
- Never use `transition-all`