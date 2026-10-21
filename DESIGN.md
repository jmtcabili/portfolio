---
name: Johan's AI Engineer Portfolio
description: A Swiss-editorial, static, text-first portfolio system. White paper, black hairlines, one typeface for text, one display face for the logo and hero, one slate-violet accent. Speed, SEO and crawlability outrank visual ambition.
colors:
  paper: "#ffffff"
  ink: "#000000"
  charcoal: "#2c2222"
  ink-muted: "#6f716e"
  fossil: "#b2b4b1"
  slate-iris: "#495472"
  on-slate-iris: "#ffffff"
  rule: "#000000"
  focus: "#495472"
  heat-0: "#eceeeb"
  heat-1: "#b2b4b1"
  heat-2: "#6f716e"
  heat-3: "#383a37"
  heat-4: "#000000"
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 62px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.011em
  heading:
    fontFamily: Hanken Grotesk
    fontSize: 30px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: 0.011em
  heading-sm:
    fontFamily: Hanken Grotesk
    fontSize: 21px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: 0.011em
  subheading:
    fontFamily: Hanken Grotesk
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: 0.011em
  body:
    fontFamily: Hanken Grotesk
    fontSize: 17px
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: 0.011em
  caption:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.011em
  display-mono:
    fontFamily: Major Mono Display
    fontSize: 62px
    fontWeight: 400
    lineHeight: 1
  logo:
    fontFamily: Major Mono Display
    fontSize: 21px
    fontWeight: 400
    lineHeight: 1.15
rounded:
  none: 0px
  utility: 4px
spacing:
  space-5: 5px
  space-10: 10px
  space-21: 21px
  space-42: 42px
  space-84: 84px
  space-147: 147px
layout:
  container: 1200px
  rail: 200px
  prose: 68ch
motion:
  ease-out: "cubic-bezier(0.23, 1, 0.32, 1)"
  ease-in-out: "cubic-bezier(0.77, 0, 0.175, 1)"
  duration-press: 160ms
  duration-fade: 200ms
  duration-reveal: 250ms
  duration-page: 280ms
components:
  button:
    backgroundColor: "{colors.slate-iris}"
    textColor: "{colors.on-slate-iris}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: 21px
  button-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-slate-iris}"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: 21px
  card-accent:
    backgroundColor: "{colors.slate-iris}"
    textColor: "{colors.on-slate-iris}"
    rounded: "{rounded.none}"
    padding: 21px
  tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: 5px 10px
---

# Johan's Portfolio design system

## Overview

A static, text-first system for a personal portfolio, styled after the Swiss editorial look of spacelab.co.uk: white paper, black hairlines, square corners, no shadows. When a design choice costs bytes, requests or JavaScript, drop the choice.

The site has three kinds of page and no others:

| Page | Purpose |
| --- | --- |
| `/` | The whole portfolio: hero, About, Experience, Stack, GitHub, featured Projects, Contact |
| `/projects/` | Index of every project |
| `/projects/<slug>/` | One project write-up |

Home-page section order: hero, `#about`, `#experience`, `#stack`, `#github`, `#projects`, `#contact`.

Principles:

- Ship HTML and CSS. Add JavaScript only when a feature cannot work without it, and write the reason next to the code.
- Give every page its own URL, with its full content in the server-rendered HTML.
- Use tokens, never literals.
- Organise with lines, not space or fills: separate blocks with a 1px `rule` hairline.
- Move things only with a named purpose: feedback, spatial continuity, a change of state, softening a jarring swap, or a rare one-time moment of delight. Motion stays inside the budget in Motion and Performance and SEO.

## Colors

- **paper** `#ffffff`: page canvas and card surface.
- **ink** `#000000`: primary text, logo, active nav item, hairlines, tag outlines.
- **charcoal** `#2c2222`: dates, organisations and captions (15:1 on paper).
- **ink-muted** `#6f716e`: inactive nav items and tertiary meta (4.9:1 on paper).
- **fossil** `#b2b4b1`: decoration only (2.1:1 on paper). Never text, links or any mark that carries meaning.
- **slate-iris** `#495472`: the only chromatic colour. Fills the primary button and the one accent card per screen. Link hover uses `link-hover`, which matches it in light. White text on it is 7.5:1.
- **focus** `#495472`: the 2px focus outline. On an accent card it becomes `paper`.
- **heat-0 to heat-4**: five neutral steps for the contribution heatmap and the activity bars (`#eceeeb`, fossil, ink-muted, `#383a37`, ink).

- **link-hover** `#495472`: the text colour of a link on hover. It equals slate-iris in light and is lighter in dark, where slate-iris is too dim for text.

No second hue, gradient or overlay.

### Dark theme

The site has a light and a dark theme with the same tokens and different values. It follows the visitor's system setting (`prefers-color-scheme`). An icon button at the end of the header overrides it: a moon in the light theme and a sun in the dark theme, showing the theme a click switches to. CSS swaps the icons with the same selectors as the theme tokens, so the right one shows on first paint. The button's `aria-label` ("Switch to dark theme" or "Switch to light theme") names the action, and each icon has `role="img"` and a `<title>` ("Moon", "Sun"). The icon is `ink-muted` at rest and `ink` on hover, with no underline.

The device setting is always the default. A choice is saved in `localStorage` only while it differs from the device:

- Switching back to the device's theme forgets the saved choice.
- A saved choice that matches the device on page load is forgotten.
- When the device changes theme while the page is open (for example, automatic dark mode at sunset), the site follows it and drops any saved choice.

| Token | Light | Dark | Notes for dark |
| --- | --- | --- | --- |
| paper | `#ffffff` | `#0d0e0d` | |
| ink, rule | `#000000` | `#eceeeb` | 16.6:1 on paper |
| charcoal | `#2c2222` | `#cfd1cd` | 12.6:1 |
| ink-muted | `#6f716e` | `#9a9c98` | 7.0:1 |
| fossil | `#b2b4b1` | `#454744` | Decoration only |
| slate-iris | `#495472` | `#56628a` | White text on it is 6.0:1 |
| focus, link-hover | `#495472` | `#a7b2d8` | 9.2:1 |
| heat-0 to heat-4 | `#eceeeb` to `#000000` | `#1b1c1b`, `#3a3c39`, `#6f716e`, `#b2b4b1`, `#eceeeb` | More contributions are brighter |

Rules:

- Components use tokens only, so they work in both themes without their own dark styles. Never hard-code a colour.
- Ink-filled elements (button hover, active filter chip, heatmap tooltip) set their text in `paper`, never in `on-slate-iris`, so they stay readable when ink turns light.
- The dark values appear twice in `global.css`: once under the media query and once under `:root[data-theme="dark"]`. Keep both in sync.
- An inline script in `<head>` applies a saved theme before first paint, so the page never flashes the other theme. Without JavaScript, the toggle stays hidden and the system setting still applies.
- The switch cross-fades with a View Transition, except under reduced motion.

## Typography

Two families, both self-hosted woff2 Latin subsets (about 29 KB together).

- **Hanken Grotesk** (variable, 300 to 600) sets all text. Headings and captions use weight 400, body uses weight 300.
- **Major Mono Display** sets only the `jmt_` logo and the home hero. It is monocase, very wide (0.74em per character) and hairline-thin: never use it for nav items, labels, paragraphs or any size under 21px, and keep the hero text to 8 characters or fewer.

Sizes are 15, 17, 19, 21, 30 and 62px only. Below 48rem, `display` and `display-mono` step down to 40px. Align text left, ragged right; never centre paragraphs.

Usage: `display-mono` for the home h1, `display` for the h1 of `/projects/` and project pages, `heading` for h2 and stat values, `heading-sm` for h3, `subheading` for the first line under the h1, `caption` for meta, dates, tags and button labels.

Font loading: preload both files; `font-display: optional` for Major Mono Display, `swap` with a metric-adjusted fallback for Hanken Grotesk.

## Layout

From 48rem, two columns inside a 1200px container: a sticky 200px left rail with the logo and index nav, and the content on the right. Below 48rem the rail becomes a top header and the index wraps into rows. No hamburger menu, top bar on wide screens or sticky header.

Spacing unit is 21px: `space-21` for card padding, gaps, button padding and the page gutter; `space-42` between a section heading and its content; `space-84` between sections and above the footer; `space-147` above the home headline. Prose is capped at 68ch.

Navigation items, in order: Home, About, Experience, Stack, GitHub, Projects, Contact. The section items are anchors written `/#about` and so on. Mark Home with `aria-current="page"` on `/` and Projects on `/projects/` and every project page; never mark an anchor.

## Elevation and depth

None. No shadows, glows or blur. Depth comes from 1px hairlines and from the single filled accent card.

## Motion

Motion is allowed when it has a named purpose and costs next to nothing. If an effect needs a library, a media file or more than a few lines of JavaScript, drop the effect.

Tokens. Use them, never literal values:

| Token | Value | Use |
| --- | --- | --- |
| `ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Anything entering or responding to input |
| `ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Something moving from one place on screen to another |
| `duration-press` | 160ms | Press feedback |
| `duration-fade` | 200ms | Fades and the page cross-fade |
| `duration-reveal` | 250ms | Content arriving, such as the GitHub island |
| `duration-page` | 280ms | Shared elements in a page transition |

Budgets:

- Keep UI motion under 300ms: 100 to 160ms for press feedback, 125 to 200ms for tooltips, 200 to 300ms for fades and page transitions.
- Use `ease-out` for entering elements. Never use `ease-in` on UI.
- Never scale from 0. Start at 0.95 to 0.97.

Keeping it light:

- CSS only by default: transitions, `@keyframes`, `@starting-style`, scroll-driven animations (`animation-timeline: view()`) and native cross-document View Transitions (`@view-transition { navigation: auto }`).
- No animation libraries: no GSAP, Framer Motion, AOS, Lottie, Astro `ClientRouter` or similar.
- JavaScript for motion only when CSS cannot do it. It counts toward the 10 KB client JavaScript cap, and the reason is written next to the code.
- Animate only `transform` and `opacity`. Never animate layout properties (width, height, top, margin) or filter and blur. The one exception is the `jmt_` wordmark typewriter, which animates `clip-path` with `steps()` over 4 characters. It changes no layout.
- No video, GIF or Lottie files for motion.
- Set `will-change` only while an animation runs; never leave it on.
- Motion must not delay the h1, the page's largest content, or shift layout. The CLS limit of 0.1 still applies.
- Wrap enhancements in `@supports`, so a browser without support shows the final state.

Where motion is not allowed:

- Body text and prose.
- Data being read: the heatmap, stats figures and tables.
- Anything triggered from the keyboard or repeated many times per visit.
- Hover effects that lift or zoom cards.
- Reveal-on-scroll for paragraphs, long text or the home page's sections.

Accessibility:

- Every animation respects `prefers-reduced-motion: reduce` with a gentler fallback (opacity only, or no motion), not only a switched-off one.
- Hover-only motion goes inside `@media (hover: hover) and (pointer: fine)`.
- Nothing blinks more than 3 times a second or loops forever. The loading skeleton's pulse is the one allowed loop, and it stops under reduced motion.

Approved uses:

| Element | Motion | Token |
| --- | --- | --- |
| GitHub stats, when the server island arrives | Opacity fade in via `@starting-style` | `duration-reveal`, `ease-out` |
| Project card title to write-up h1 | Cross-document View Transition with one shared `view-transition-name` per project; the rest of the page fades | `duration-page` for the title, `duration-fade` for the page |
| In-page nav anchors | `scroll-behavior: smooth` under `prefers-reduced-motion: no-preference`; sections get `scroll-margin-top: space-21` | None |
| `jmt_` wordmark on `/` | Typewriter: `clip-path` with `steps(4)` over 320ms after a 150ms delay; the `_` blinks twice, then stays solid. The h1 name never animates | Values stated here; this is the only exception |
| `/projects/` filter | The targeted section fades in; hiding stays instant | `duration-fade`, `ease-out` |
| `/projects/` cards | Scroll-driven entrance, opacity plus `translateY(12px)`, inside `@supports (animation-timeline: view())` | `ease-out` |
| Button | Optional `:active { transform: scale(0.97) }` | `duration-press`, `ease-out` |

## Shapes

Every corner is square (`rounded.none`). `rounded.utility` (4px) is reserved for a rare utility element such as the skip link.

## Components

- **SiteShell:** skip link, left rail with the `jmt_` logo and index nav, content column, hairline footer. The `jmt_` wordmark types itself in on `/` (see Motion).
- **Button:** the only filled control. Slate-iris fill, white caption text, ink on hover. May scale to 0.97 on press (see Motion).
- **Tag:** square, 1px ink outline, 5px by 10px padding.
- **ProjectCard:** square card with a 1px outline; one per screen may be the slate-iris accent card. The title link stretches over the card. The title carries into the write-up h1 as a page transition, and cards on `/projects/` enter on scroll (see Motion).
- **Timeline:** hairline rows with a 10rem date column from 40rem.
- **TechStack:** hairline rows grouped by category, 10rem label column from 40rem.
- **Prose:** long-form text capped at 68ch.
- **GithubStats:** repositories, stars, followers and a square language bar with a text legend. The stats fade in when the server island arrives (see Motion).
- **StreakStats:** current streak, longest streak with dates, active days, total contributions.
- **ContributionHeatmap:** 53 by 7 grid as one inline SVG of five paths, labelled months, Less to More legend.
- **ActivityBreakdown:** commits, pull requests, issues and reviews with counts, shares and bars.
- **WeekdayActivity:** average contributions per weekday and the busiest day.
- **OrgList:** text links to organisations contributed to, most active first.

GitHub data is fetched on request, not at build time. The home page is prerendered, and the GitHub block (`GithubIsland`) is a server island (`server:defer`) rendered on demand by the Cloudflare adapter:

- Two GraphQL calls, using `GITHUB_TOKEN`: one for the years with contributions, then one aliased query for every year plus the last 12 months.
- Results are cached in memory for 10 minutes.
- While the island loads, `CalendarSkeleton` holds its place. It must match the loaded block's size, so the swap causes no layout shift.
- If the call fails, the island shows a plain-text fallback with a link to the GitHub profile.
- The result is rendered as HTML text. The browser never calls GitHub; it only fetches the island from the site's own origin.
- Crawlers get the skeleton in the initial HTML, not the figures, so the stats are not part of what search engines index.

## Performance and SEO

| Metric | Limit |
| --- | --- |
| Largest Contentful Paint | 2.5 s or less |
| Interaction to Next Paint | 200 ms or less |
| Cumulative Layout Shift | 0.1 or less |
| Lighthouse Performance, mobile | 95 or more |
| Transferred per page, excluding images | 100 KB or less |
| Inline critical CSS | 14 KB or less |
| Client JavaScript | 0 KB by default; 10 KB or less with a written reason, motion JavaScript included |
| Font files | 2 woff2, 30 KB or less in total |
| Third-party requests | 0 |
| Animation libraries | 0 |

Use prerendered HTML from Astro, with the GitHub server island as the only on-demand part, plus AVIF with WebP fallback, immutable hashed assets and Brotli. For SEO: semantic landmarks, one h1 per page, titles of the form `<Page> · Johan`, a canonical URL, Open Graph tags, a sitemap and robots file, JSON-LD `ProfilePage` and `Person` on `/`, and breadcrumb data on project pages. Render GitHub stats as real text, never as third-party image badges.

## Do's and Don'ts

Do:
- Write in first person, plainly and specifically, in sentence case.
- Write dates as `Jun 2025 – Present` and give links text that names the destination.
- Give every image `width`, `height` and `alt`.
- Keep the 2px focus outline on every interactive element.
- Repeat chart figures as text so colour is never the only cue.
- Give every animation a named purpose, a motion token and a `prefers-reduced-motion` fallback.
- Animate only `transform` and `opacity`, in CSS.

Don't:
- Use icons, emoji, exclamation marks, gradients, shadows or a second hue. The one exception is the theme toggle's sun and moon: hand-drawn inline SVG, 1.5px stroke, square caps and miter joins, no fill.
- Use `slate-iris` for body text, borders or decoration, or `fossil` for text.
- Set Major Mono Display in nav, labels or paragraphs.
- Add routes beyond the three pages or a hamburger menu.
- Add a third theme, or give a component its own dark-mode colours instead of using tokens.
- Embed third-party scripts, widgets or stats images.
- Add an animation library or use video, GIF or Lottie for motion.
- Animate layout properties, filter or blur, or leave `will-change` on.
- Animate body text, data being read, or anything repeated many times per visit.
- Lift or zoom cards on hover, or reveal paragraphs and home-page sections on scroll.
