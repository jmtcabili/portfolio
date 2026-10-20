---
name: Johan's Portfolio
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

## Colors

- **paper** `#ffffff`: page canvas and card surface.
- **ink** `#000000`: primary text, logo, active nav item, hairlines, tag outlines.
- **charcoal** `#2c2222`: dates, organisations and captions (15:1 on paper).
- **ink-muted** `#6f716e`: inactive nav items and tertiary meta (4.9:1 on paper).
- **fossil** `#b2b4b1`: decoration only (2.1:1 on paper). Never text, links or any mark that carries meaning.
- **slate-iris** `#495472`: the only chromatic colour. Fills the primary button and the one accent card per screen, and tints an inline link on hover. White text on it is 7.5:1.
- **focus** `#495472`: the 2px focus outline. On an accent card it becomes `paper`.
- **heat-0 to heat-4**: five neutral steps for the contribution heatmap and the activity bars (`#eceeeb`, fossil, ink-muted, `#383a37`, ink).

Light only. No dark theme, toggle, second hue, gradient or overlay.

## Typography

Two families, both self-hosted woff2 Latin subsets (about 29 KB together).

- **Hanken Grotesk** (variable, 300 to 600) sets all text. Headings and captions use weight 400, body uses weight 300.
- **Major Mono Display** sets only the `johan_` logo and the home hero. It is monocase, very wide (0.74em per character) and hairline-thin: never use it for nav items, labels, paragraphs or any size under 21px, and keep the hero text to 8 characters or fewer.

Sizes are 15, 17, 19, 21, 30 and 62px only. Below 48rem, `display` and `display-mono` step down to 40px. Align text left, ragged right; never centre paragraphs.

Usage: `display-mono` for the home h1, `display` for the h1 of `/projects/` and project pages, `heading` for h2 and stat values, `heading-sm` for h3, `subheading` for the first line under the h1, `caption` for meta, dates, tags and button labels.

Font loading: preload both files; `font-display: optional` for Major Mono Display, `swap` with a metric-adjusted fallback for Hanken Grotesk.

## Layout

From 48rem, two columns inside a 1200px container: a sticky 200px left rail with the logo and index nav, and the content on the right. Below 48rem the rail becomes a top header and the index wraps into rows. No hamburger menu, top bar on wide screens or sticky header.

Spacing unit is 21px: `space-21` for card padding, gaps, button padding and the page gutter; `space-42` between a section heading and its content; `space-84` between sections and above the footer; `space-147` above the home headline. Prose is capped at 68ch.

Navigation items, in order: Home, About, Experience, Stack, GitHub, Projects, Contact. The section items are anchors written `/#about` and so on. Mark Home with `aria-current="page"` on `/` and Projects on `/projects/` and every project page; never mark an anchor.

## Elevation and depth

None. No shadows, glows, blur, motion, transitions or scroll effects. Depth comes from 1px hairlines and from the single filled accent card.

## Shapes

Every corner is square (`rounded.none`). `rounded.utility` (4px) is reserved for a rare utility element such as the skip link.

## Components

- **SiteShell:** skip link, left rail with the `johan_` logo and index nav, content column, hairline footer.
- **Button:** the only filled control. Slate-iris fill, white caption text, ink on hover.
- **Tag:** square, 1px ink outline, 5px by 10px padding.
- **ProjectCard:** square card with a 1px outline; one per screen may be the slate-iris accent card. The title link stretches over the card.
- **Timeline:** hairline rows with a 10rem date column from 40rem.
- **TechStack:** hairline rows grouped by category, 10rem label column from 40rem.
- **Prose:** long-form text capped at 68ch.
- **GithubStats:** repositories, stars, followers and a square language bar with a text legend.
- **StreakStats:** current streak, longest streak with dates, active days, total contributions.
- **ContributionHeatmap:** 53 by 7 grid as one inline SVG of five paths, labelled months, Less to More legend.
- **ActivityBreakdown:** commits, pull requests, issues and reviews with counts, shares and bars.
- **WeekdayActivity:** average contributions per weekday and the busiest day.
- **OrgList:** text links to organisations contributed to, most active first.

All GitHub data is fetched at build time (REST plus one GraphQL call, using `GITHUB_TOKEN`) and rendered as HTML. The browser never calls GitHub.

## Performance and SEO

| Metric | Limit |
| --- | --- |
| Largest Contentful Paint | 2.5 s or less |
| Interaction to Next Paint | 200 ms or less |
| Cumulative Layout Shift | 0.1 or less |
| Lighthouse Performance, mobile | 95 or more |
| Transferred per page, excluding images | 100 KB or less |
| Inline critical CSS | 14 KB or less |
| Client JavaScript | 0 KB by default; 10 KB or less with a written reason |
| Font files | 2 woff2, 30 KB or less in total |
| Third-party requests | 0 |

Use static HTML (Astro or Eleventy), AVIF with WebP fallback, immutable hashed assets and Brotli. For SEO: semantic landmarks, one h1 per page, titles of the form `<Page> · Johan`, a canonical URL, Open Graph tags, a sitemap and robots file, JSON-LD `ProfilePage` and `Person` on `/`, and breadcrumb data on project pages. Render GitHub stats as real text, never as third-party image badges.

## Do's and Don'ts

Do:
- Write in first person, plainly and specifically, in sentence case.
- Write dates as `Jun 2025 – Present` and give links text that names the destination.
- Give every image `width`, `height` and `alt`.
- Keep the 2px focus outline on every interactive element.
- Repeat chart figures as text so colour is never the only cue.

Don't:
- Use icons, emoji, exclamation marks, gradients, shadows or a second hue.
- Use `slate-iris` for body text, borders or decoration, or `fossil` for text.
- Set Major Mono Display in nav, labels or paragraphs.
- Add routes beyond the three pages, a hamburger menu or a theme toggle.
- Embed third-party scripts, widgets or stats images.
