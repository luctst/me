# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio site for Lucas Tostee (Full Stack JavaScript Developer, freelance). Single-page Next.js app with mobile/desktop detection via user-agent, serving different layouts per device.

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

- **Single route**: `apps/web/app/page.tsx` is the only page. It reads `user-agent` headers server-side and renders either `<Mobile />` or the desktop layout with `<SidebarProvider>` + `<AppSidebar>`.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`. Global styles in `packages/ui/src/styles/globals.css` with OKLCH CSS custom properties for theming. Dark mode via `next-themes`.
- **Data table**: Uses `@tanstack/react-table` in `apps/web/components/data-table.tsx`.
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
