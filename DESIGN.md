---
name: Johan Marlo Cabili Portfolio
description: A Swiss-editorial, static, text-first portfolio. White paper, black hairlines, square corners, one typeface for text, one display face for the wordmark, one slate-violet accent. Speed, SEO and crawlability outrank visual ambition.
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
  link-hover: "#495472"
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
    lineHeight: 1.2
    letterSpacing: 0.011em
  subheading:
    fontFamily: Hanken Grotesk
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.3
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
    lineHeight: 1.3
    letterSpacing: 0.011em
  logo:
    fontFamily: Major Mono Display
    fontSize: 21px
    fontWeight: 400
    lineHeight: 1.15
rounded:
  none: 0px
  utility: 4px
  portrait: 50%
spacing:
  space-5: 5px
  space-10: 10px
  space-21: 21px
  space-42: 42px
  space-84: 84px
  space-147: 147px
components:
  button:
    backgroundColor: "{colors.slate-iris}"
    textColor: "{colors.on-slate-iris}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: 21px
  button-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
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
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: 5px 10px
  filter-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: 10px 21px
    height: 44px
  filter-chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  portrait:
    rounded: "{rounded.portrait}"
    width: 200px
---

# Design System: Johan Marlo Cabili Portfolio

## Overview

**Creative North Star: "The Hairline Index"**

A static, text-first portfolio styled after the Swiss editorial look of spacelab.co.uk: white paper, black 1px hairlines, square corners, no shadows. Content is organised as an index of hairline rows, with a 200px label column on the left and the content on the right from 48rem. When a design choice costs bytes, requests or JavaScript, drop the choice.

The visitor is evaluating, often on a phone, often for under a minute. The first mobile screen must show the name and the role. GitHub activity follows in the hero as live proof, then "Get in touch", then experience, stack, projects and contact.

The site has three kinds of page, plus a 404 page, and no others:

| Page | Purpose |
| --- | --- |
| `/` | The whole portfolio: hero, About, Experience, Stack, GitHub, featured Projects, Contact |
| `/projects/` | Index of every project, filterable by kind |
| `/projects/<slug>/` | One project write-up |
| `/404` | Not-found page: a large "404", a plain one-line message, hairline rows to Home, Projects, Contact and the résumé, then the featured projects. `noindex`, no canonical, left out of the sitemap |

**Key Characteristics:**

- Organise with lines, not fills or extra space: blocks are separated by a 1px `rule` hairline.
- One chromatic colour, used sparingly. Everything else is ink on paper.
- Ship HTML and CSS. Add JavaScript only when a feature cannot work without it, and write the reason next to the code.
- Every page has its own URL with its full content in the server-rendered HTML.
- Tokens, never literals.
- Move things only with a named purpose (see Motion below).

### Motion

Motion is allowed when it has a named purpose (feedback, spatial continuity, a change of state, softening a jarring swap, or a rare one-time moment of delight) and costs next to nothing. If an effect needs a library, a media file or more than a few lines of JavaScript, drop it. Motion tokens live in `global.css` and in `.impeccable/design.json`.

| Token | Value | Use |
| --- | --- | --- |
| `ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Anything entering or responding to input |
| `ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Something moving from one place on screen to another |
| `duration-press` | 160ms | Press feedback |
| `duration-fade` | 200ms | Fades and the page cross-fade |
| `duration-reveal` | 250ms | Content arriving, such as the GitHub island |
| `duration-page` | 280ms | Shared elements in a page transition |

Rules:

- Keep UI motion under 300ms. Use `ease-out` for entering elements; never `ease-in` on UI. Never scale from 0; start at 0.95 to 0.97.
- CSS only by default: transitions, `@keyframes`, `@starting-style`, scroll-driven animations and native cross-document View Transitions. No animation libraries, no Astro `ClientRouter`, no video, GIF or Lottie.
- Animate only `transform` and `opacity`.
- Motion must not delay the h1 or shift layout (CLS 0.1 or less). Wrap enhancements in `@supports` so unsupported browsers show the final state.
- Not allowed on: body text, data being read (heatmap, stats), anything keyboard-triggered or repeated many times per visit, card hover lift or zoom, reveal-on-scroll for home-page sections.
- Every animation has a `prefers-reduced-motion: reduce` fallback (opacity only, or none). Hover-only motion goes inside `@media (hover: hover) and (pointer: fine)`. Nothing loops forever except the loading skeleton's pulse, which stops under reduced motion.

Approved uses:

| Element | Motion |
| --- | --- |
| GitHub stats when the server island arrives | Opacity fade via `@starting-style`, `duration-reveal` |
| Project card title to write-up h1 | Cross-document View Transition, one `view-transition-name` per project; the rest of the page fades |
| In-page nav anchors | `scroll-behavior: smooth` under no-preference; sections get `scroll-margin-top: space-21` |
| `/projects/` filter | The targeted section fades in; hiding stays instant |
| `/projects/` cards | Scroll-driven entrance, opacity plus `translateY(12px)`, inside `@supports (animation-timeline: view())` |
| Button | `:active { transform: scale(0.97) }`, `duration-press` |
| Theme switch | View Transition cross-fade, except under reduced motion |

### Performance and SEO

| Metric | Limit |
| --- | --- |
| Largest Contentful Paint | 2.5 s or less |
| Interaction to Next Paint | 200 ms or less |
| Cumulative Layout Shift | 0.1 or less |
| Lighthouse Performance, mobile | 95 or more |
| Transferred per page, excluding images | 100 KB or less |
| Client JavaScript | 0 KB by default; 10 KB or less with a written reason |
| Font files | 2 woff2, 30 KB or less in total |
| Third-party requests | 0 |

Prerendered HTML from Astro, with the GitHub server island as the only on-demand part. AVIF with WebP fallback for images. For SEO: semantic landmarks, one h1 per page, a canonical URL on `jmtcabili.dev`, Open Graph and Twitter tags with `/og.jpg`, a sitemap and `robots.txt`, and `Person` JSON-LD on `/`. Page titles:

- Home: `Johan Marlo Cabili · Full Stack AI-native Engineer`
- Other pages: `<Page> · Johan Marlo Cabili`

The role is written **Full Stack AI-native Engineer** everywhere: titles, link previews, structured data, the hero and the contact note.

## Colors

Ink on paper, with one slate-violet accent that appears at most once or twice per screen.

### Primary

- **Slate Iris** (`slate-iris`): the only chromatic colour. Fills the primary button and the one accent card on `/projects/`, and is the text-selection colour. White text on it is 7.5:1. Never body text, borders or decoration.

### Neutral

- **Paper** (`paper`): page canvas and card surface.
- **Ink** (`ink`): primary text, logo, active nav item, hairlines, tag and card outlines, filled states (button hover, active filter chip, tooltip).
- **Charcoal** (`charcoal`): dates, organisations, captions and meta (15:1 on paper).
- **Ink Muted** (`ink-muted`): inactive nav items, the theme toggle at rest, subheadings and secondary notes (4.9:1 on paper).
- **Fossil** (`fossil`): decoration only (2.1:1). Never text, links or any mark that carries meaning.
- **Rule** (`rule`): the 1px hairline. Same value as ink.
- **Focus** (`focus`) and **Link Hover** (`link-hover`): the 2px focus outline and link hover text. They equal slate-iris in light and turn lighter in dark, where slate-iris is too dim for text.
- **Heat 0–4** (`heat-0` to `heat-4`): five neutral steps for the contribution heatmap and the loading skeleton.

### Dark theme

Same tokens, different values. The site follows `prefers-color-scheme`. A 44px icon button at the end of the header overrides it: a moon in light and a sun in dark, showing the theme a click switches to. Its `aria-label` names the action ("Switch to dark theme"), each icon has `role="img"` and a `<title>`. The choice is saved in `localStorage` only while it differs from the device, and is dropped when the device changes theme.

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

### Named Rules

**The One Hue Rule.** No second hue, gradient or overlay. The only exception is the heatmap skeleton's stripe pattern, which uses `heat-0`.

**The Ink-Fill Rule.** Anything filled with ink sets its text in `paper`, never `on-slate-iris`, so it stays readable when ink turns light in dark mode.

**The Twin Block Rule.** Dark values appear twice in `global.css`, under the media query and under `:root[data-theme="dark"]`. Keep both in sync. Components never carry their own dark-mode colours.

## Typography

**Text Font:** Hanken Grotesk (variable 300–600, with `system-ui` fallback)
**Wordmark Font:** Major Mono Display (with Hanken Grotesk fallback)

**Character:** a neutral, slightly humanist grotesk at light weights carries every word; a hairline monocase display face appears only as the `jmt_` wordmark, so it reads as a signature, not a voice.

Both are self-hosted woff2 Latin subsets (about 29 KB together), preloaded. Major Mono Display uses `font-display: optional`; Hanken Grotesk uses `swap`.

### Hierarchy

- **Display** (400, 62px, 1.0): the h1 on every page, including the home name. Steps down to 40px below 48rem.
- **Heading** (400, 30px, 1.1): h2 section headings, the hero role line, stat values, the contact email.
- **Heading small** (400, 21px, 1.2): h3 row titles and card titles.
- **Subheading** (400, 19px, 1.3): the first line under an h1 (hero lede, page lede).
- **Body** (300, 17px, 1.3): paragraphs and list items. Prose is capped at 68ch.
- **Caption** (400, 15px, 1.3): nav, dates, meta, tags, chips, button labels, footer.
- **Logo** (400, 21px): the `jmt_` header wordmark.

### Named Rules

**The Six Sizes Rule.** Sizes are 15, 17, 19, 21, 30 and 62px only (40px is the mobile step of 62px). Nothing under 15px.

**The Signature Rule.** Major Mono Display sets only the header `jmt_` logo. Never nav, labels, paragraphs or any size under 21px.

**The Ragged Right Rule.** Align text left, ragged right. Never centre paragraphs. Use `text-wrap: balance` on headings and `pretty` on ledes.

## Layout

A single 1200px container with a 21px side gutter. A top header holds the wordmark, the index nav and the theme toggle above a hairline. There is no left rail, no hamburger menu and no sticky header.

**Header.**

- From 48rem: one row, the wordmark on the left and the nav plus toggle on the right.
- Below 48rem: two rows. The wordmark and toggle share row 1 and the nav wraps on the rows below.
- Every nav link and the toggle are at least 44px tall. The header's vertical padding is `space-10`, because the 44px targets already supply the breathing room.

**Sections.**

- From 48rem: two columns, a 200px label column (h2, dates, row labels) and the content on the right. Rows use a 10rem date column.
- Below 48rem: everything stacks in one column, with the date above the title.

**Home hero.**

- One column at every width, top to bottom: the round portrait, the name (h1), the role line, the lede (capped at 52ch), the GitHub activity block (caption heading "GitHub activity"), then the "Get in touch" button. No wordmark in the hero; the header carries `jmt_`.
- Portrait: 147px from 48rem, 84px below. Space above the hero: `space-84` from 48rem, `space-42` below. The name and role must fit in a 390×660 viewport.

**Home section order:** hero (with `#github` inside it), `#about`, `#experience`, `#stack`, `#projects`, `#contact`.

**Spacing.** The unit is 21px:

| Token | Use |
| --- | --- |
| `space-5`, `space-10` | Gaps inside a component |
| `space-21` | Card padding, row padding, gaps, button padding, gutter |
| `space-42` | Between a heading and its content; mobile hero top |
| `space-84` | Between sections, above the footer and above the home hero from 48rem |

**Navigation:** Home, About, Experience, Stack, Projects, Contact, Résumé (PDF). Section items are anchors written `/#about`. The last item downloads the résumé (`download` attribute) and its label says it is a PDF. Mark Home with `aria-current="page"` on `/`, and Projects on `/projects/` and every write-up. Never mark an anchor.

**Touch targets.** Every link and button outside running prose is at least 44px tall:

- Nav, footer and breadcrumb links, the toggle and chips get a `min-height` of 44px.
- Row-title links and the contact email extend their hit area with padding and an equal negative margin, so the visual rhythm stays the same.

### Named Rules

**The First Screen Rule.** On a 390×660 phone, the name and the role are visible without scrolling. "Get in touch" sits right after the GitHub block, and the Contact nav link is always one tap away.

**The Container Rule.** Wide components (the heatmap, the card grid) size to their column, not the viewport. The heatmap uses fixed 10px cells (about 634px for 53 weeks), which fits the full-width hero from 48rem; below 48rem it is hidden. If the heatmap moves into a narrower column, raise that breakpoint so it never overflows.

## Elevation & Depth

None. No shadows, glows or blur. Depth comes from 1px hairlines, the 1px outlines on cards and tags, and the single slate-iris accent card.

**The Flat Paper Rule.** If something needs to stand out, give it a hairline or the one accent fill, never a shadow.

## Shapes

Square by default (`rounded.none`). Two exceptions:

- **The portrait** is a circle (`rounded.portrait`), cropped from the top of the photo so the face stays in frame. It is the only round shape on the site and the only photograph in the shell.
- **Utility elements** such as the skip link may use 4px (`rounded.utility`).

Lines are always 1px, except the 2px focus outline and the 2px underline on the current nav item.

## Components

### Buttons

- **Shape:** square (0px).
- **Primary:** slate-iris fill, white 15px caption text, 21px padding. It is the only filled control.
- **Hover:** ink fill with paper text. **Press:** scales to 0.97. **Focus:** 2px `focus` outline, offset 2px.
- Home has two: "Get in touch" in the hero and "See all N projects" under Projects. Don't add more.

### Tags

- Square, 1px ink outline, 5px by 10px padding, 15px caption. Static labels, not links.

### Filter chips (`/projects/`)

- Links to section anchors. They work with CSS `:target` and no JavaScript.
- Square, 1px ink outline, 10px by 21px padding, at least 44px tall, with the count in tabular figures.
- **Active:** ink fill with paper text. "All" is active when nothing is targeted. **Hover:** underline.

### Cards (`/projects/`)

- **Corner style:** square. **Border:** 1px ink. **Background:** paper. **Padding:** 21px.
- The title link stretches over the whole card. Focus outlines the card.
- Cards with a screenshot show it in a 16:10 frame. Cards without one show the summary as 21px text.
- Lead cards span two columns. The grid is one, two or three columns, measured on the content column with container queries.
- **Accent card:** one per page, the first card on `/projects/`, filled slate-iris with white text and outlines.

### Navigation

- 15px caption, `ink-muted` at rest. Hover and current state: `ink` with a 2px underline.
- Each link is at least 44px tall.
- The theme toggle is a 44px square icon button: `ink-muted` at rest, `ink` on hover. The 20px sun and moon icons are hand-drawn inline SVG with a 1.5px stroke, square caps and miter joins.

### Rows (Timeline, Stack, Projects on home, Details on write-ups)

- Rows are separated by hairlines and have 21px vertical padding.
- From 40rem, a 10rem label column (date, category or kind) sits on the left.
- Experience rows: dates, role, organisation, then a bulleted list.
- Stack rows: a category label and a wrap of tags.

### GitHub section

- A server island (`server:defer`) rendered on demand by the Cloudflare adapter, cached for 10 minutes. It is the only part of the page that isn't prerendered.
- **Stats:** three outlined cards. Total commits and longest streak (with its dates) share a row on mobile. "Organisations contributed to" spans the full width below them, as outlined badge links with a 20px organisation logo and the name (each logo has alt text). From 48rem the three cards sit in one row.
- **Contribution heatmap:**
  - A grid of 53 weeks by 7 days with month labels, a "Less to More" legend and a caption that gives the total as text.
  - It is decorative to assistive tech (`aria-hidden`) because the caption carries the meaning. Day details show on hover only, as a visual aid.
  - It shows from 48rem.
- **Loading:** a skeleton matches the loaded block's size, so the swap causes no layout shift. It is announced with `role="status"` and visually hidden text.
- **Failure:** a plain-text fallback with a link to the GitHub profile.

### Contact

- The email as a 30px heading-size `mailto:` link. Below it, text links to the résumé PDF and LinkedIn, then a short note in `ink-muted`.
- Write-ups and the 404 page end with a Contact row: an email `mailto:` link.

### Footer

- A hairline, then the copyright and text links to Email (`mailto:`), GitHub and LinkedIn, each at least 44px tall.

## Do's and Don'ts

### Do:

- **Do** write in first person, plainly and specifically, in sentence case.
- **Do** write dates as `Jun 2025 – Present` and give links text that names the destination.
- **Do** give every image `width`, `height` and descriptive `alt` text. Never use an empty alt, even for a logo beside its label.
- **Do** keep the 2px focus outline on every interactive element.
- **Do** make every link and button outside running prose at least 44px tall.
- **Do** repeat chart figures as text, so colour is never the only cue.
- **Do** give every animation a named purpose, a motion token and a reduced-motion fallback.
- **Do** check every page at 360, 390, 768 and 1280px with no horizontal scroll.

### Don't:

- **Don't** use icons, emoji, exclamation marks, gradients, shadows or a second hue. Exceptions: the sun and moon toggle icons, and the organisation logos in the GitHub badges.
- **Don't** round corners. The portrait circle and the 4px skip link are the only exceptions.
- **Don't** use `slate-iris` for body text, borders or decoration, or `fossil` for any text.
- **Don't** set Major Mono Display anywhere but the header `jmt_` logo.
- **Don't** add routes beyond the three page types and the 404 page, a hamburger menu, a sticky header or a left rail.
- **Don't** add a third theme, or give a component its own dark-mode colours.
- **Don't** embed third-party scripts, widgets or stats images. Render GitHub data as HTML text.
- **Don't** add an animation library, or animate layout properties, filter or blur.
- **Don't** lift or zoom cards on hover, or reveal paragraphs and home sections on scroll.
- **Don't** use `role="tooltip"` on hover-only decorations.
