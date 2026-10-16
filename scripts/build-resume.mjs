import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { html, hash, sourceHash } from "./resume-content.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = join(projectRoot, "resume", "kevinas-ramoska-resume.html");
const outputPath = join(projectRoot, "public", "kevinas-ramoska-resume.pdf");
const manifestPath = join(projectRoot, "resume", "manifest.json");

if (process.argv.includes("--check")) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (
    readFileSync(inputPath, "utf8") !== html ||
    manifest.sourceHash !== sourceHash ||
    manifest.pdfHash !== hash(readFileSync(outputPath))
  ) {
    throw new Error("The served resume is stale. Run npm run resume:build and commit the generated HTML, PDF, and manifest.");
  }
  console.log("Resume HTML and PDF match the shared career and project content.");
  process.exit(0);
}

writeFileSync(inputPath, html);

const candidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  process.env.LOCALAPPDATA
    ? join(
        process.env.LOCALAPPDATA,
        "Google",
        "Chrome",
        "Application",
        "chrome.exe",
      )
    : undefined,
].filter(Boolean);

const chromePath = candidates.find((candidate) => existsSync(candidate));

if (!chromePath) {
  throw new Error(
    "Google Chrome or Chromium was not found. Set CHROME_PATH to its executable.",
  );
}

const result = spawnSync(
  chromePath,
  [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--export-tagged-pdf",
    `--print-to-pdf=${outputPath}`,
    `file://${inputPath}`,
  ],
  { stdio: "inherit" },
);

if (result.status !== 0 || !existsSync(outputPath)) {
  throw new Error("Resume PDF generation failed.");
}

writeFileSync(manifestPath, JSON.stringify({ sourceHash, pdfHash: hash(readFileSync(outputPath)) }, null, 2) + "\n");

console.log(`Created ${outputPath}`);
