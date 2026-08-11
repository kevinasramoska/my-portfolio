# Portfolio Performance Measurements

This document records production-build measurements so performance work is evaluated against evidence rather than visual impressions.

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
