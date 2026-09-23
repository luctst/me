---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Home

Scope: the single route (`app/page.tsx`). Read mode.

Audience and job: a visitor asking "who is Lucas and what is he shipping right now". One page answers both: a typed statement, two paragraphs, then five live lines of GitHub activity.

Action and proof: no primary CTA. Proof is the "Lately on GitHub" list: the five newest public events that read as shipping (pushes to main, merged pull requests, published releases, new repositories), each with verb, repository link, one-line detail (commit message, PR title, release name, or repo description) and a relative time, closed by a quiet "All activity on GitHub" link. Contact links in the footer.

Constraints: public events feed for `luctst` (90-day window, up to 300 events), one follow-up call per row for the detail, hourly server-side revalidation, six calls an hour, optional `GITHUB_TOKEN`. States: 0 rows says "Nothing public in the last 90 days"; unreachable says "GitHub is unreachable right now"; the link renders in every state. Freelance framing retired; no location; Kayu links to its App Store page.

Direction: one responsive column (max 42rem), shared frame, curtain reveals joining the home timeline (heading 950ms, rows from 1050ms at 100ms steps, link after the last row, footer after that). Rows carry no tags; the list is ink and grey only. The /activity route, the table, and the panel link were removed on 2026-09-22.

Unresolved: the default branch is assumed to be main or master.
