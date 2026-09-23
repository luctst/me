# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: anyone trying to answer "who is Lucas Tostée and what has he shipped": hiring managers, teammates, peers, and people arriving from GitHub, npm, the Raycast store, LinkedIn, or one of his apps. They should get a clear answer within a minute.

Secondary: people who might install his iOS app Kayu and the apps that follow it. The site is a signpost to them, not a growth channel.

Lucas is in a full-time position (confirmed 2026-09-22). The site is not a lead-generation surface for freelance work.

## Product Purpose

Personal site at lucastostee.me. Its job is clarity: state what Lucas does, show what he has built and where he has worked, and point to his code and apps.

Success: a visitor understands his profile and current focus quickly and can reach GitHub, LinkedIn, email, or an app in one click. Not success metrics: freelance leads, traffic volume.

## Positioning

Software engineer with a product-engineer focus. In an AI-assisted era the differentiator is shipping complete, high-value products end to end, not only writing code. Evidence (real work; the home names only Kayu and the employers, the rest lives on GitHub): Kayu: Medicine Finder (iOS), Tickets (banking web app, thousands of users), marcdown (native macOS editor), commai (npm CLI), Paper (Raycast extension), and enterprise work (Linxea monolith-to-headless migration, PrestaShop modules). Kayu (iOS) extends this into native mobile.

## Operating Context

- Single-route site at lucastostee.me, deployed on Vercel with Vercel Analytics.
- One responsive column on every screen; no device split.
- The only hand-edited content is the home copy in `apps/web/components/home.tsx`. Project and work history live in two paragraphs there; the live proof comes from GitHub. No CMS, no JSON.
- Visitors often arrive from GitHub (luctst), npm, the Raycast store, LinkedIn, or the apps themselves.
- Lucas also mentors on OpenClassrooms (since 2021); the site mentions it.

## Capabilities and Constraints

Confirmed:
- Home: a typed statement, two paragraphs (current work, past work, mentoring), and "Lately on GitHub".
- Light/dark theme toggle.
- Contact links: email, GitHub, LinkedIn.
- Built 2026-09-22: "Lately on GitHub", the five newest public events for `luctst` that read as shipping (pushes to main, merged pull requests, published releases, new repositories), each with a one-line detail and a relative time, revalidated hourly. It is the public proof of ongoing shipping and the standing challenge to keep committing. A quiet stretch shows as older dates or "Nothing public in the last 90 days". The earlier `/activity` route was built and then removed the same day as too much.
- Kayu: Medicine Finder (iOS) is linked from the home copy: https://apps.apple.com/fr/app/kayu-medicine-finder/id6778128009?l=en-GB. Future apps are mentioned the same way.

Decided 2026-09-22:
- Retire the freelance framing: no "Freelance" in the page title, metadata, or copy, and no "Hire me" Malt CTA. Done 2026-09-22.
- No geographic location anywhere on the site or in metadata. Lucas works remotely.

Open:
- None.

Terminology: "Lately on GitHub" is the user-facing label for the activity list.

## Brand Commitments

- Name: Lucas Tostée (accent in the display name). Handle: `luctst` on GitHub, npm, and Raycast.
- Voice: first person, plain, short, casual and direct ("Welcome to my website, my name is Lucas...").
- Incumbent identity cue in code: a terminal / source-code motif (blinking underscore cursor, a loader that types out HTML source). Recorded as evidence, not as a binding requirement; new-work decides whether to preserve or replace it.

## Evidence on Hand

- The home copy in `apps/web/components/home.tsx`: the current product (Kayu, App Store link) and past employers by name. marcdown and Tickets were dropped from the copy on 2026-09-22 at Lucas's request; they remain real work but are not named on the site. GitHub supplies the activity rows at request time.
- Public profiles: github.com/luctst, LinkedIn, npm `@luctst`.
- Absent and must not be fabricated: screenshots or demos, testimonials, client quotes, download counts, or metrics beyond the "thousands of users" already stated for Tickets. Lucas confirmed no further evidence is needed or available for now.

## Product Principles

1. Clarity over persuasion: the visitor understands who Lucas is and what he ships without hunting.
2. Proof is what shipped: link to real products, packages, and code; never pad with claims.
3. Product engineer, not just coder: frame work by the value it delivered, not only the stack.
4. Honest and current: no freelance CTA while full-time, no location, no invented assets.
5. One page, low maintenance: the only hand-edited content is a few sentences; the proof updates itself from GitHub.

## Accessibility & Inclusion

No product-specific requirement beyond baseline web accessibility. Existing code has aria labels on dialogs, expand buttons, and the theme toggle, plus Escape-to-close on modals. Keep that floor.
