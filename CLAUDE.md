# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Next.js 16** (App Router, Turbopack, `src/` directory)
- **React 19** with TypeScript
- **Tailwind CSS v4** (using `@import "tailwindcss"` + `@plugin` directives, no `tailwind.config.js`)
- **daisyUI 5** (installed as dependency, configured via `@plugin "daisyui"` in CSS)

## Commands

```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Design Principles

- **Mobile-first** — 所有布局和组件优先适配移动端，再通过 `sm:` / `md:` / `lg:` 断点扩展桌面端体验

## Architecture

- `src/app/` — App Router pages and layouts
- `src/app/globals.css` — Tailwind + daisyUI entry point (themes configured here via `@plugin "daisyui/theme"`)
- `@/*` path alias maps to `./src/*`

## daisyUI Theme Configuration

Themes are defined in `src/app/globals.css` using `@plugin "daisyui/theme"` blocks (Tailwind v4 way, NOT `tailwind.config.js`). Each theme block sets `name`, `default`, `prefersdark`, `color-scheme`, and CSS custom properties for colors, radii, borders, etc.
