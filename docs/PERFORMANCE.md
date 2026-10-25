# Portfolio Performance Measurements

This document records production-build measurements so performance work is evaluated against evidence rather than visual impressions.

## 2026-10-25 - Mobile production baseline

Measured after the career, hero, and RentRight content refresh, using Node 24 and
Playwright's Chromium 156.0.8078.4 against the local production build.

| Homepage JavaScript | Current build |
| --- | ---: |
| Referenced chunks | 8 |
| Raw bytes | 603,785 |
| Gzip bytes | 188,116 |

| Fresh-browser sample | Largest contentful paint | Initial-load CLS | TTFB | Horizontal overflow |
| --- | ---: | ---: | ---: | ---: |
| 1 | 3,172 ms | 0 | 206.1 ms | 0 px |
| 2 | 4,380 ms | 0 | 13.9 ms | 0 px |
| 3 | 2,444 ms | 0 | 22.6 ms | 0 px |

Median LCP is **3,172 ms**, with substantial variation. An exploratory run on
24 October was faster (1,748-1,824 ms), so these observations do not establish a
specific code regression or an improvement. Repeat under controlled host load and
collect production field evidence before attributing the variation. No speed
optimization or Core Web Vitals pass is claimed by this content update.

### Reproduce

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
```

In a second terminal:

```bash
npm run performance:measure
```

The script uses the existing Playwright dependency. Each sample has a fresh
375x812 browser context, cache disabled, 4x CPU slowdown, and configured network
emulation of 150 ms latency, 1.6 Mbps download, and 750 Kbps upload. Observers run
until two seconds after network idle; CLS uses the maximum session-window score,
excluding recent-input shifts. The homepage server and image caches may already
be warm. Localhost TTFB does not represent a real visitor's network round trip.

These are short synthetic initial-load observations, not Lighthouse scores,
real-user data, full-session CLS, or interaction latency/INP measurements. Host
hardware/load affects CPU emulation. JavaScript totals count the deduplicated
homepage script URLs in generated HTML, including shared framework runtime;
they do not measure every dynamically loaded or prefetched route. The historical
August figures used older framework/content versions and are not a controlled
before/after comparison for this release.

### Follow-up

- Collect Search Console/CrUX field data when sufficient traffic is available.
- Investigate the LCP element and browser main-thread trace in a controlled run
  before deciding whether rendering, animation, or JavaScript work needs changing.
- Keep real-device, keyboard, and assistive-technology review separate from load
  timing; a fast synthetic sample does not prove usability.

## 2026-08-11 — Server component and motion refactor

The homepage previously marked Hero, About, Experience, Skills, and Contact as client components. Four of those sections imported Framer Motion even though their configured start and end values were both fully visible. The refactor keeps Header as the only interactive client component and renders the remaining content on the server.

| Homepage JavaScript | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Referenced chunks | 9 | 8 | 1 |
| Raw bytes | 712,392 | 578,190 | 134,202 (18.8%) |
| Gzip bytes | 221,327 | 178,317 | 43,010 (19.4%) |

Framer Motion and its transitive packages were removed from the application dependency graph. The production output no longer contains a Framer Motion chunk.

### Measurement method

1. Run `npm run build` from a clean application state.
2. Read the JavaScript chunk URLs referenced by `.next/server/app/index.html`.
3. Sum each referenced file's raw size under `.next/static/chunks/`.
4. Gzip each referenced file with Node's `zlib.gzipSync` and sum the results.

These totals include shared Next.js and React runtime chunks. Chunk names are build-specific, and the gzip total does not model browser caching across routes. The figures are useful as a consistent local regression signal, not as a substitute for preview-deployment Web Vitals or Lighthouse measurements.
