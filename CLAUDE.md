# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website (vinodsantharam.github.io) built with **Next.js 16 App Router**, statically exported to GitHub Pages. There is no backend, no database, and no client-side data fetching — all content is read from the filesystem at build time.

## Commands

```bash
npm run dev      # Local dev server (next dev)
npm run build    # Static export -> ./out  (uses --webpack; `npm run export` is identical)
npm run lint     # eslint via next lint
npm start        # Serve a production build (rarely needed; site is static)
```

Node version is pinned to `20` (`.nvmrc` / `.node-version`). There is no test suite.

## Architecture

- **Static export only.** `next.config.js` sets `output: 'export'`, `images.unoptimized: true`, and `trailingSlash: true`. Anything requiring a server runtime (API routes, middleware, ISR, server actions, `next/image` optimization, dynamic params not enumerated at build) will break the export. Dynamic routes **must** implement `generateStaticParams` (see `src/app/blog/[slug]/page.tsx`).

- **Content is filesystem-driven.** Markdown lives in `content/`. `src/lib/markdown.ts` is the single access layer: `getAllMarkdownPosts(dir)`, `getPostBySlug(dir, slug)`, etc., all resolve paths relative to `content/`, parse frontmatter with `gray-matter`, and run **synchronously at build time** (uses `fs`). The `dir` argument maps to a subfolder of `content/` (e.g. blog posts are read from `content/blog/`). To add a blog post, drop a `.md` file with `title`/`date` frontmatter into `content/blog/` — no code change needed.

- **Markdown rendering** goes through `src/components/MarkdownRenderer.tsx` (react-markdown + remark-gfm + rehype-raw/rehype-sanitize). Raw HTML in markdown is allowed but sanitized.

- **Books** are hardcoded data, not markdown: `src/lib/books.ts` exports a `books` array consumed by `src/app/books/page.tsx` and `src/components/BookCard.tsx`. Cover images live in `public/`.

- **Theming** uses `next-themes` via `src/components/theme-provider.tsx` (wraps the app in `layout.tsx`) and `theme-toggle.tsx`.

- **UI primitives** are shadcn/ui style components in `src/components/ui/` (Radix + class-variance-authority + tailwind-merge). `src/lib/utils.ts` exports the `cn()` helper. Config in `components.json`. Tailwind CSS v4 (config-less, via `@tailwindcss/postcss`); global styles and design tokens are in `src/app/globals.css`.

## Conventions

- Server Components by default; only add `'use client'` for components needing browser APIs or interactivity (theme toggle, etc.). Do not introduce client-side data fetching — content is loaded at build time.
- TypeScript everywhere; prefer `interface` over `type`; named exports for components; functional components only.
- Path alias `@/*` -> `src/*` (see `tsconfig.json`).

> Note: `.cursor/rules/` mentions Supabase and `nuqs` — these are **not** used in this project and should be ignored. The rest of those style guidelines (functional patterns, RSC-first, Tailwind/Radix) do apply.

## Deployment

Pushes to `main` trigger `.github/workflows/` which runs `npm ci && npm run build` and deploys `./out` to GitHub Pages. `basePath` is empty because this is a `username.github.io` root site — keep it empty unless the repo is renamed to a project page.
