# Spec: Projects Panel — GitHub Footer Link

## Objective

Add a footer row to the projects table on the portfolio site that links visitors to the full GitHub profile. This preserves the existing curated 5-project showcase as the primary signal while acknowledging deeper work exists for visitors who want to explore.

**Why this approach (and not dynamic GitHub fetching):**
A freelance portfolio's job is to build visitor confidence quickly, not to render a catalog. Curation is the product — GitHub repo descriptions are dev notes, not client-facing pitches. The footer link offers a clear exit for curious visitors without burdening the rest with noise.

## User story

> As a portfolio visitor who has scanned the 5 curated projects and wants to see more of Lucas's work, I can click a single, unobtrusive link at the bottom of the projects table that takes me to his GitHub profile.

## Scope

**In scope:**
- A single centered link rendered **outside the table** (sibling element directly below `<Table>`)
- Link text: `See more on GitHub →` (trailing ASCII arrow, no icon)
- Destination: `https://github.com/luctst`, opens in a new tab (`target="_blank"`, `rel="noopener noreferrer"`)
- Visible on the **projects tab only** — absent on the experiences tab
- Scrolls with the page (no sticky behavior)

**Out of scope:**
- Fetching GitHub repos via API
- Virtualized rendering of 100+ projects
- Auto-populating project metadata from GitHub
- Adding the link to the experiences tab
- Any change to the existing 5 curated entries in `projects.json`
- A generic `footer` slot on the `DataTable` component (rejected — see implementation rationale)

## Implementation surface

- `apps/web/components/projects-items.tsx` — wrap the existing `<DataTable />` and render a sibling `<div>` below it, gated by `active === 'projects'`. The link lives here, **not inside the table**.
- `apps/web/components/data-table.tsx` — **no changes**.

### Why outside the table, not inside

The projects table has a right-pinned `date` column with a left border (`hasBorderLeft: true`) and per-column pinning math. A `colSpan` footer row would either inherit those column borders and look broken, or fight them and look like a rendering bug. Tables are a data surface — rows are projects. A meta-link is not a project, so it doesn't belong in the data structure. Rendering it as a sibling element also keeps `DataTable` clean of project-specific concerns.

This mirrors how Linear (changelog), Notion (template gallery), and Claude.ai (chat history) handle the same pattern — "See all →" sits *outside* the list, never as a row.

## Styling

- ~24px (`mt-6`) vertical space above the link — whitespace is the separator; no horizontal rule
- Centered horizontally
- `text-muted-foreground text-sm`
- Hover: `text-foreground` + `underline`, with smooth color transition
- No background, no border, no icon — text + trailing `→` only
- Reuses the existing fade-in animation pattern with a slightly later `animation-delay` than the table so it lands after the rows have settled

## Boundaries

- **Always:** Render the link as a sibling of the table, never as a row inside it. Keep `DataTable` untouched.
- **Ask first:** Adding any additional footer content (e.g. a second link, contact CTA) — the value of this link is its singularity. Promoting it to a button or adding an icon — both would break the page's visual hierarchy (Hire me must remain the only loud CTA).
- **Never:** Replace or hide the curated projects with dynamic content. Never add the link to the experiences tab. Never put a horizontal rule above the link — whitespace does the work.

## Success criteria

- [ ] Link visible directly below the projects table, centered horizontally, with ~24px of breathing room above it
- [ ] Renders as a plain text link with a trailing `→`, in muted foreground
- [ ] Hover transitions to foreground color with underline
- [ ] Clicking opens `https://github.com/luctst` in a new tab
- [ ] Link is absent when the user switches to the experiences tab
- [ ] No visual conflict with the right-pinned `date` column or column borders
- [ ] Link fades in after the table rows (animation-delay ≥ table's)
- [ ] No regressions to row expansion, column pinning, or the existing fade-in animation
- [ ] `pnpm typecheck` and `pnpm lint` pass

## Open questions

None — direction confirmed:
1. Projects tab only ✅
2. GitHub handle = `luctst` ✅
3. Scroll with content (not sticky) ✅
