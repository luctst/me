---
name: lucastostee.me
description: A personal site that types itself in, ink on warm paper, one blinking cursor.
colors:
  warm-paper: "oklch(0.965 0.005 75)"
  raised-paper: "oklch(0.995 0.003 75)"
  paper-white: "oklch(0.985 0 0)"
  soft-ink: "oklch(0.205 0 0)"
  pencil-grey: "oklch(0.5 0 0)"
  hairline: "oklch(0.922 0 0)"
  focus-ring: "oklch(0.708 0 0)"
  hover-wash: "oklch(0.97 0 0)"
  highlighter-yellow: "oklch(0.95 0.2 105)"
  night-ink: "oklch(0.145 0 0)"
  night-raised: "oklch(0.269 0 0)"
  night-pencil: "oklch(0.708 0 0)"
  night-highlighter: "oklch(0.85 0.15 105)"
typography:
  display:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: "3.5rem"
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "1.875rem"
  headline:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: "1.25rem"
  title:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.25rem"
  body:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.5rem"
  body-compact:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: "1.25rem"
  label:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: "1rem"
rounded:
  md: "8px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
components:
  button-theme-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.soft-ink}"
    rounded: "{rounded.md}"
    size: "28px"
  button-theme-toggle-hover:
    backgroundColor: "{colors.hover-wash}"
  link-arrow:
    backgroundColor: "transparent"
    textColor: "{colors.soft-ink}"
    typography: "{typography.label}"
  link-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.pencil-grey}"
    typography: "{typography.body-compact}"
  link-quiet-hover:
    textColor: "{colors.soft-ink}"
  link-inline:
    backgroundColor: "transparent"
    textColor: "{colors.soft-ink}"
    typography: "{typography.lead}"
  list-heading:
    backgroundColor: "transparent"
    textColor: "{colors.soft-ink}"
    typography: "{typography.body-compact}"
  activity-row:
    backgroundColor: "transparent"
    textColor: "{colors.soft-ink}"
    typography: "{typography.body}"
    padding: "12px 0"
---

# Design System: lucastostee.me

## Overview

**Creative North Star: "The Quiet Terminal"**

The site behaves like a text editor at rest on warm paper. Nothing is laid out; everything is typed in. The page boots by printing its own HTML source line by line, then the name, the role, the statement, and five lines of GitHub activity rise into place one line at a time, each behind an invisible curtain. One underscore blinks. That cursor, and the cadence of the reveals, carry the whole "developer" identity. There is no monospace font, no dark hacker chrome, no gradient. Roboto in three weights on a cream ground does the work.

Density is low and the palette is nearly monochrome: Soft Ink on Warm Paper, with Pencil Grey for the past. A single saturated color exists, Highlighter Yellow, and it is spent on text selection only. Depth is tonal, never cast, and today nothing on the page is raised: there is no panel, no card, no table. The page is one column of prose closed by a short list. The statement says what Lucas builds, "Lately on GitHub" shows the last five things he shipped, and every row leads to the repository or the commit on GitHub.

**Key Characteristics:**
- Warm cream ground, near-black ink, one highlighter kept for text selection
- Text reveals by sliding up through an overflow-hidden curtain, never by fading alone
- A single blinking underscore is the identity mark
- Flat, tonal depth; no shadows; hairlines are the only lines
- Roboto only, three weights (700 / 500 / 400), hierarchy by weight and by ink vs grey, not by color
- Measured, staggered choreography: 700ms curtains, rows 100ms apart, a boot sequence of about 2.2s that plays once per session
- One route, one column, max 42rem, on every screen

## Colors

Ink on warm paper, with one highlighter kept in the drawer for selection.

### Primary
- **Soft Ink** (`colors.soft-ink`): all reading text: the statement, the name, the first paragraph, the verb and repository of each activity row, the "Lately on GitHub" heading, the footer links, and the sun or moon icon. It doubles as the shadcn `--primary` token, so a library button or badge, if one ever returns, renders as ink.

### Neutral
- **Warm Paper** (`colors.warm-paper`): the page ground and the only fill on the page. Rows, links, and the list are transparent on it.
- **Raised Paper** (`colors.raised-paper`): declared as `--surface-elevated` and reserved for the next elevated surface. Nothing on the shipped page uses it; the panel link that did was removed.
- **Paper White** (`colors.paper-white`): the `--primary-foreground` token; in dark mode it becomes the reading text.
- **Pencil Grey** (`colors.pencil-grey`): the past and the supporting line. The role line, the second paragraph (previous employers), each row's detail and relative time, the two note lines ("GitHub is unreachable right now.", "Nothing public in the last 90 days."), the quiet link at rest, and the underline beneath an inline link. It sits at `oklch(0.5 0 0)` so it passes body-text contrast on Warm Paper. It means "true, but not now."
- **Hairline** (`colors.hairline`): the 1px rule between activity rows and the default border token.
- **Hover Wash** (`colors.hover-wash`): the theme toggle's hover fill, barely darker than paper.
- **Focus Ring** (`colors.focus-ring`): keyboard focus. The theme toggle draws a 3px ring at 50% alpha; every link keeps the browser focus outline, colored Focus Ring at 50% alpha by the base layer.

### Tertiary
- **Highlighter Yellow** (`colors.highlighter-yellow`): the browser text-selection highlight, set on `body`. That is its only appearance. It marks a selection, never a state and never a call to action.

### Dark mode
The same roles re-point under the `.dark` class: ground becomes **Night Ink** (`colors.night-ink`), hover washes and any future raised surface **Night Raised** (`colors.night-raised`), muted text **Night Pencil** (`colors.night-pencil`), and the selection accent dims to **Night Highlighter** (`colors.night-highlighter`) so ink text stays readable on it. Text inverts to Paper White. Default theme is light; the toggle sits at the far right of the footer. The `--sidebar`, `--card`, `--popover`, and `--chart-*` token families are still declared in `globals.css` for the unused library components; nothing on the site reads them.

### Named Rules
**The One Highlighter Rule.** Highlighter Yellow appears on text selection and nowhere else. Every other surface is ink, grey, or paper. If a new element wants color, it is wrong.

**The Tonal Depth Rule.** Elevation is a lighter sheet (Raised Paper), never a shadow. New panels pick a paper token, not a `box-shadow`. Today no panel exists; the rule says what one would be.

**The Past Is Grey Rule.** Pencil Grey carries what already happened and what supports: former employers, the role line, a row's detail and its date. What Lucas is doing now is Soft Ink: the statement, the current products, the verb and the repository.

## Typography

**Display Font:** Roboto (with a metric-adjusted Arial fallback generated by next/font)
**Body Font:** Roboto
**Label/Mono Font:** none. There is deliberately no monospace face.

**Character:** One neutral grotesque carrying everything, so hierarchy comes from weight (700 and 500 against 400), tone (ink against grey), and one size jump (48px over 18px and 16px text), not from a second family. The terminal feeling is behavioral: the cursor and the typing cadence, not the letterforms. Three weights are loaded: 400, 500, 700.

### Hierarchy
- **Display** (400, 48px / 56px line from `sm`, 40px / 48px line below, -0.025em): the statement, "I build software products, end to end." It is the only large type on the page. Capped at 22ch and set with `text-wrap: balance` so it breaks into two even lines at every width.
- **Lead** (400, 18px / 30px): the two paragraphs, capped at 60ch (about 75 characters of Roboto) inside the 42rem column. Product names inside them are inline links.
- **Headline** (700, 16px / 20px): the name "Lucas Tostée" at the top of the page, plain text. There is one route, so the name links nowhere.
- **Title** (400, 16px / 20px, Pencil Grey): the role line beneath the name, led by the blinking underscore. The role steps down by tone, not by stroke; Roboto Thin at 16px was a hairline and is gone.
- **Body** (400, 16px / 24px): the verb line of an activity row, "Merged #37 in marcdown". The repository name inside it is weight 500 and is the link. The 24px line is the row's line: the detail and the time sit on it too.
- **Body-compact** (400, 14px / 20px): the "Lately on GitHub" heading at weight 500, the two note lines, and the quiet link. Inside a row, the detail and the relative time keep the 14px size but take the row's 24px line so they share the verb's baseline.
- **Label** (500, 12px / 16px): the three footer links with an 8px arrow. Sized in rem so it scales with the visitor's font preference.

### Named Rules
**The Curtain Rule.** Every text reveal is a `translateY(100%)` to `0` inside an `overflow: hidden` wrapper, 700ms ease, with a per-element delay. Text never simply fades in; it rises into view. The `Reveal` component is the only way to do this. It renders spans only, so it can sit inside a paragraph, a heading, a list item, or a link without breaking the markup.

**The Underscore Rule.** Exactly one blinking `_` on the page, on the role line, 1s linear. It is the identity mark, not punctuation: do not add a second one to a heading, a link, or a list row, and do not replace it with a pipe or a block cursor.

## Layout

One responsive column, chosen by nothing: no user-agent split, no route change, and a single breakpoint (`sm`, 640px) that only re-flows the activity row and steps the statement down.

**The frame:** a centered column capped at 42rem (`max-w-2xl`), padded 40px top and bottom, inside a body with 16px side padding. The header holds the name and, 4px below, the role line with its cursor. The main content starts 40px below the header. The footer follows the content 48px below it, never pinned to the viewport, so a short page is a short page: three arrow links (Mail, GitHub, LinkedIn) 16px apart on the left, the theme toggle pushed to the far right.

**Home:** the statement, then 32px, a Soft Ink paragraph, then 16px, a Pencil Grey paragraph, then 40px, the "Lately on GitHub" section. Paragraphs cap at 60ch; the statement at 22ch. Inside the section: the 14px heading, 4px, the list, 12px, the quiet "All activity on GitHub →" link. When a note line stands in for the list ("GitHub is unreachable right now." or "Nothing public in the last 90 days.") it sits 8px under the heading and the link 8px under it.

**The list:** the newest activity is always visible as one row under a 1px Hairline; the remaining rows (up to four) sit behind a native `<details>` disclosure whose summary reads "4 more ›" (or "Show less" once open), a quiet 14px line with 8px of vertical padding and a 12px chevron that turns 90° when open. Open, the rows follow as an ordered list with a Hairline between rows and none after the last. Every row has 12px of vertical padding and no horizontal padding, so the text sits flush with the column edge. Closed, the whole home fits a 1440×800 laptop viewport and a 390×900 phone. Each row is one baseline-aligned, wrapping flex line with a 16px column gap and a 2px row gap. It holds the verb and repository link (16px on the 24px line), the detail (14px Pencil Grey), and the relative time (14px Pencil Grey, tabular numerals, pushed to the right edge). From `sm` the detail takes the remaining width between the repository and the time on the same line, cut with an ellipsis, the full text carried in a `title` attribute. Below `sm` the detail drops to a second line clamped at two lines while the time stays on the verb's line. The time is on the verb's line at every width.

**Rhythm:** vertical spacing steps are 4 / 8 / 12 / 16 / 32 / 40 / 48px. Two one-offs: the 2px row gap inside a wrapped activity row, and the 5px between a footer label and its arrow.

**Choreography is part of layout.** On the first visit of a session the source-typing loader runs first: 92 lines at 20ms each (about 1.84s), then a 400ms blur-fade, a scroll to top, and handoff, about 2.2s in all; later visits in the same session skip it. Then the page reveals in order: name 100ms, role 300ms, statement 400ms, first paragraph 650ms, second paragraph 800ms, list heading 950ms, rows from 1050ms at 100ms steps (the fifth at 1450ms), the "All activity" link 100ms after the last row (1550ms with five rows; 1150ms when a note line stands in), footer links 1700 / 1850 / 2000ms, theme toggle 2150ms. Every curtain runs 700ms, so the page settles about 2.9s after handoff. New elements join this timeline rather than appearing instantly. Under `prefers-reduced-motion: reduce` a global rule collapses every animation duration and delay to 0.01ms and the iteration count to 1, keeping fill-mode, so everything lands in its final state at once; the JS loader is skipped entirely.

## Elevation & Depth

Flat. There are no shadows anywhere in the shipped surface, and no raised surface either: the page is text on Warm Paper with hairlines between rows. Depth, when it is needed, is two paper tones (page and Raised Paper); the token is declared and waiting. Nothing is sticky or stacked. The shadcn `shadow-xs` on the library button exists in the package but is not used on the site.

### Named Rules
**The No-Shadow Rule.** Surfaces are flat at rest and flat on hover. Hover and focus are communicated with a Hover Wash fill, an underline, or a color shift from Pencil Grey to Soft Ink, never with lift.

## Shapes

Square. The theme toggle is the only rounded element on the page, at 8px; everything else is text and a hairline. There is no panel; if one returns it is a square sheet of Raised Paper with at most a 2px corner. Borders are 1px Hairline and appear only between activity rows: no outer border, no rule under the heading, no rule after the last row. Icons are Lucide: 16px for the sun and moon, 12px for the arrow on the quiet link, 8px for the arrows on the footer links. Hover on text is an underline offset 4px, never a box.

## Components

### Frame header
- **Character:** the name over the role, the only place the cursor lives.
- **Name:** 16px bold Soft Ink on a 20px line, plain text, 4px above the role.
- **Role:** 16px regular Pencil Grey on a 20px line, led by the blinking underscore and a space: "_ Software engineer".
- **Entrance:** name at 100ms, role at 300ms, through the curtain.

### Activity list (signature)
- **Character:** the proof. One line that reads like a changelog, ink for what happened and grey for the detail and the date, with four more a click away behind a native disclosure. Every row links out to GitHub.
- **Heading** (`list-heading`): "Lately on GitHub", 14px medium Soft Ink on a 20px line, 4px above the list. It is an `h3` labelling the section.
- **Row** (`activity-row`): 12px vertical padding, 1px Hairline beneath (none after the last), transparent on Warm Paper. Verb and repository in 16px on a 24px line; the repository is a weight-500 Soft Ink link, no underline at rest, underline on hover. Detail in 14px Pencil Grey on the row's 24px line, one line with an ellipsis from `sm` and two clamped lines below, full text in `title`; when the commit, pull request, or release has a URL the detail is a link that turns Soft Ink and underlines on hover. Relative time ("last week", "2 weeks ago") in 14px Pencil Grey with tabular numerals, right-aligned, on the verb's line at every width.
- **States:** when GitHub cannot be reached the list is replaced by "GitHub is unreachable right now."; when the 90-day feed has nothing public, by "Nothing public in the last 90 days." Both are 14px Pencil Grey on a 20px line, 8px under the heading. The quiet link renders in every state.
- **Entrance:** heading at 950ms, the first row at 1050ms, the "4 more" summary at 1150ms, the quiet link at 1250ms. Rows inside the disclosure carry no entrance; they appear the instant it opens.

### Buttons
- **Theme toggle** (`button-theme-toggle`): a 28px square, transparent, 8px radius, with a 16px moon (light) or sun (dark) in Soft Ink; Hover Wash fill on hover, 3px Focus Ring at 50% alpha on keyboard focus, labelled "Switch to dark theme" / "Switch to light theme". It is the only button on the page.

### Links
- **Inline link** (`link-inline`): Soft Ink text in the lead paragraph with a Pencil Grey underline offset 4px that turns Soft Ink on hover. Used for product names ("Kayu").
- **Repository link:** the repository name inside an activity row, 16px weight 500 Soft Ink, no underline at rest, underline offset 4px on hover.
- **Detail link:** a row's detail when it has a target, 14px Pencil Grey, no underline at rest, Soft Ink and underlined on hover.
- **Arrow link** (`link-arrow`): 12px medium Soft Ink text with an 8px arrow-right icon 5px after it, no underline; underline on hover. The three footer links.
- **Quiet link** (`link-quiet`): 14px Pencil Grey with a 12px arrow 4px after it, turning Soft Ink with an underline on hover. "All activity on GitHub →", closing the list.

### Navigation
- The frame is the navigation: the name, the role line, the footer links, and the theme toggle. There is one route, so nothing links within the site; every link leaves for GitHub, LinkedIn, mail, or a product. No menu, no nav list.

### Loader (signature)
Full-screen boot sequence that prints the site's own HTML source, one 16px line every 20ms, each line indented by a random 0–50px and rising through a 500ms curtain. When the 92 lines are done it blurs and fades over 400ms, scrolls to top, and hands off to the page; the whole boot is about 2.2s. It plays once per browser session (`sessionStorage`) and is skipped entirely when the visitor prefers reduced motion.

### Reveal (signature)
The `Reveal` component: an `overflow: hidden` span around a block-level span that starts at `translateY(100%)` and runs `fadeIn` for 700ms ease with a per-element delay. It takes `delay`, `children`, and an optional `className` for the inner span (the footer links use it for `flex`, the activity rows for their flex-wrap line). Every line of the frame and the home passes through it. `Cursor` is its sibling: the `_` with the 1s `blink`.

## Do's and Don'ts

### Do:
- **Do** reveal new text through the Curtain Rule with `ease` timing over 700ms and a stagger of 100–250ms between siblings.
- **Do** express hierarchy with weight (700 / 500 / 400) and with Soft Ink versus Pencil Grey.
- **Do** build a new elevated surface, if one is ever needed, from Raised Paper (or Night Raised in dark mode).
- **Do** keep Highlighter Yellow on text selection only.
- **Do** keep everything inside the one 42rem column with the footer following the content.
- **Do** keep the one underscore on the role line and nowhere else.
- **Do** keep every activity row one line at `sm` and above, with the time on the verb's line at every width.
- **Do** style through the theme tokens so both light and dark modes stay correct.

### Don't:
- **Don't** add `box-shadow`, gradients, or blur to convey depth.
- **Don't** reach for a monospace face to signal "developer"; the cursor and cadence already do it in Roboto.
- **Don't** introduce a second accent color or use Highlighter Yellow for tags, buttons, links, or states.
- **Don't** use spring or bounce easing; the site uses `ease` and `linear` only.
- **Don't** round anything but the theme toggle; if a panel returns, keep its corner at 2px or less.
- **Don't** make elements appear instantly on load; join the reveal timeline.
- **Don't** bring back a second route, a repository table, technology tags, a sidebar, a device split, or a hand-maintained project list; one live row, with four more behind a disclosure, is the proof.
