import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { chromium } from "@playwright/test";

// Run against a production build after `npm run start -- --port 3100`.
const baseUrl = new URL(process.argv[2] ?? "http://127.0.0.1:3100/");
if (!["127.0.0.1", "localhost", "[::1]"].includes(baseUrl.hostname)) {
  throw new Error("Use a local production server for this reproducible benchmark.");
}
const sampleCount = Number(process.env.PORTFOLIO_PERFORMANCE_SAMPLES ?? 3);
if (!Number.isInteger(sampleCount) || sampleCount < 1 || sampleCount > 10) {
  throw new Error("PORTFOLIO_PERFORMANCE_SAMPLES must be an integer from 1 to 10.");
}
const traceDirectory = process.env.PORTFOLIO_TRACE_DIR
  ? resolve(process.env.PORTFOLIO_TRACE_DIR) : null;
if (traceDirectory) mkdirSync(traceDirectory, { recursive: true });

async function saveTrace(session, path) {
  const complete = new Promise((resolve) => session.once("Tracing.tracingComplete", resolve));
  await session.send("Tracing.end");
  const { stream } = await complete;
  const parts = [];
  try {
    while (true) {
      const { data, base64Encoded, eof } = await session.send("IO.read", { handle: stream });
      parts.push(Buffer.from(data, base64Encoded ? "base64" : "utf8"));
      if (eof) break;
    }
    writeFileSync(path, Buffer.concat(parts));
  } finally {
    await session.send("IO.close", { handle: stream });
  }
}

const html = readFileSync(new URL("../.next/server/app/index.html", import.meta.url), "utf8");
const chunks = [...new Set([...html.matchAll(/src="([^"?]+\.js)(?:\?[^\"]*)?"/g)]
  .map((match) => match[1]).filter((path) => path.startsWith("/_next/")))];
if (!chunks.length) throw new Error("No JavaScript chunks found. Build the app first.");
const sizes = chunks.map((path) => {
  const file = new URL(`../.next/${path.slice("/_next/".length)}`, import.meta.url);
  return { raw: statSync(file).size, gzip: gzipSync(readFileSync(file)).length };
});

const browser = await chromium.launch();
const samples = [];
try {
  for (let index = 0; index < sampleCount; index++) {
    const context = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    try {
      const page = await context.newPage();
      const session = await context.newCDPSession(page);
      await session.send("Network.enable");
      await session.send("Network.setCacheDisabled", { cacheDisabled: true });
      await session.send("Network.emulateNetworkConditions", {
        offline: false, latency: 150, downloadThroughput: 1_600_000 / 8, uploadThroughput: 750_000 / 8,
      });
      await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      if (traceDirectory) {
        await session.send("Tracing.start", {
          categories: "devtools.timeline,loading,blink.user_timing",
          transferMode: "ReturnAsStream",
        });
      }
      await page.addInitScript(() => {
        window.__portfolioPerformance = { lcpMs: null, cls: 0, lcpCandidates: [], longTasks: [] };
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__portfolioPerformance.lcpMs = entry.startTime;
            window.__portfolioPerformance.lcpCandidates.push({
              timeMs: entry.startTime, size: entry.size,
              element: entry.element?.tagName.toLowerCase() ?? null,
              text: entry.element?.textContent?.trim().slice(0, 120) ?? null,
              url: entry.url || null,
            });
          }
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__portfolioPerformance.longTasks.push({ startMs: entry.startTime, durationMs: entry.duration });
          }
        }).observe({ type: "longtask", buffered: true });
        let sessionValue = 0;
        let sessionStart = 0;
        let sessionLast = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.hadRecentInput) continue;
            if (entry.startTime - sessionLast > 1000 || entry.startTime - sessionStart > 5000) {
              sessionValue = entry.value;
              sessionStart = entry.startTime;
            } else {
              sessionValue += entry.value;
            }
            sessionLast = entry.startTime;
            window.__portfolioPerformance.cls = Math.max(window.__portfolioPerformance.cls, sessionValue);
          }
        }).observe({ type: "layout-shift", buffered: true });
      });
      const response = await page.goto(baseUrl.toString(), { waitUntil: "networkidle" });
      if (response?.status() !== 200) throw new Error("Homepage did not return HTTP 200.");
      await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 2000)));
      samples.push(await page.evaluate(() => {
        const navigation = performance.getEntriesByType("navigation")[0];
        return {
          lcpMs: window.__portfolioPerformance.lcpMs,
          fcpMs: performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? null,
          lcpCandidates: window.__portfolioPerformance.lcpCandidates,
          longTasks: window.__portfolioPerformance.longTasks,
          cls: window.__portfolioPerformance.cls,
          ttfbMs: navigation.responseStart - navigation.requestStart,
          documentResponseEndMs: navigation.responseEnd,
          stylesheets: performance.getEntriesByType("resource")
            .filter((entry) => new URL(entry.name).pathname.endsWith(".css"))
            .map((entry) => ({ path: new URL(entry.name).pathname, responseEndMs: entry.responseEnd, transferBytes: entry.transferSize })),
          horizontalOverflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      }));
      if (traceDirectory) await saveTrace(session, join(traceDirectory, `sample-${index + 1}.json`));
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify({
  measuredAt: new Date().toISOString(), chromium: browser.version(),
  tracingEnabled: Boolean(traceDirectory),
  conditions: "Local production homepage; 375x812; 4x CPU slowdown; 150ms latency; 1.6Mbps down/750Kbps up; fresh browser cache per sample; observation ends two seconds after network idle; server/image cache may be warm.",
  javascript: { chunks: chunks.length, rawBytes: sizes.reduce((sum, size) => sum + size.raw, 0), gzipBytes: sizes.reduce((sum, size) => sum + size.gzip, 0) },
  samples,
}, null, 2));
