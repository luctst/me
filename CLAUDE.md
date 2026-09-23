# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal site for Lucas Tostée (software engineer). A single Next.js page: a typed statement, two paragraphs, and "Lately on GitHub", five live activity rows fetched from the GitHub events API.

## Monorepo structure

- **pnpm 10.4.1** workspaces + **Turborepo** for task orchestration
- `apps/web` — Next.js 15 app (App Router, React 19, Turbopack dev server)
- `packages/ui` — Shared shadcn/ui component library (New York style, Radix primitives, Lucide icons)
- `packages/eslint-config` — Shared ESLint configs (`base`, `next-js`, `react-internal`)
- `packages/typescript-config` — Shared tsconfig presets (`base`, `nextjs`, `react-library`)

## Commands

```bash
pnpm dev          # Start all apps in dev mode (Turbopack)
pnpm build        # Build all apps/packages
pnpm lint         # Lint all packages
pnpm format       # Prettier on **/*.{ts,tsx,md}

# Web app specific (run from apps/web/)
pnpm dev          # next dev --turbopack
pnpm lint:fix     # next lint --fix
pnpm typecheck    # tsc --noEmit
```

## Adding shadcn/ui components

Components live in `packages/ui/src/components/`. Add new ones from the repo root:

```bash
pnpm dlx shadcn@latest add <component> -c apps/web
```

Import in the web app as:

```tsx
import { Button } from '@workspace/ui/components/button'
```

Utility: `cn()` from `@workspace/ui/lib/utils` (clsx + tailwind-merge).

## Architecture notes

- **Single route**: `apps/web/app/page.tsx` is the only page, one responsive column on every screen. `components/frame.tsx` is the shared header/footer, `components/home.tsx` the content, `components/loader.tsx` the once-per-session boot sequence.
- **GitHub data**: `apps/web/lib/github.ts` fetches the public events for `luctst`, keeps pushes to main, merged PRs, releases, and new repos, collapses merge-commit pushes into their PR, and revalidates hourly. Set `GITHUB_TOKEN` in the environment to lift the unauthenticated rate limit. Unit tests: `node --test lib/github.test.ts` from `apps/web/`.
- **Design records**: `apps/web/PRODUCT.md` (product truth) and `apps/web/DESIGN.md` (visual system, "The Quiet Terminal") are maintained with the Impeccable skill; keep them in sync with UI changes.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`. Global styles in `packages/ui/src/styles/globals.css` with OKLCH CSS custom properties for theming. Dark mode via `next-themes`.
- **Deployment**: Vercel (analytics integrated via `@vercel/analytics`).

## Git workflow

Never push directly to `master`. Always create a branch from `master` using the naming convention:

```
<type>/kebab-case-description
```

Where `<type>` is one of: `feat`, `fix`, `refactor`, `docs`, `chore`, `ci`, `test`, `perf`.

Examples: `feat/add-contact-form`, `fix/sidebar-scroll-bug`, `docs/update-readme`.

## Path aliases

- `@/*` — `apps/web/` root
- `@workspace/ui/*` — UI package exports
- `@workspace/eslint-config/*` — ESLint configs
- `@workspace/typescript-config/*` — TypeScript configs
