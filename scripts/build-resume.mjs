import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = join(projectRoot, "resume", "kevinas-ramoska-resume.html");
const outputPath = join(projectRoot, "public", "kevinas-ramoska-resume.pdf");

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

console.log(`Created ${outputPath}`);
