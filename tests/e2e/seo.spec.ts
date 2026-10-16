import { expect, test } from "@playwright/test";

const origin = "https://kevinasramoska-portfolio.vercel.app";
const routes = [
  "/", "/projects", "/writing",
  "/projects/crypto-portfolio-tracker", "/projects/rentright",
  "/writing/designing-safe-transaction-correction",
  "/writing/role-based-authorization-beyond-roles",
  "/writing/testing-aspnet-with-playwright",
  "/writing/kafka-lessons-from-production-style-workflows",
];

test("every public page has distinct, indexable metadata and valid structured data", async ({ page }) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of routes) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(title).toContain("Kevinas Ramoska");
    expect(titles.has(title), `Duplicate title on ${path}`).toBe(false);
    expect(description?.length).toBeGreaterThan(40);
    expect(descriptions.has(description!), `Duplicate description on ${path}`).toBe(false);
    titles.add(title);
    descriptions.add(description!);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    const socialUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(new URL(canonical!).toString()).toBe(`${origin}${path}`);
    expect(new URL(socialUrl!).toString()).toBe(`${origin}${path}`);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_IE");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    const data = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(data.length).toBeGreaterThan(0);
    for (const json of data) expect(JSON.parse(json)["@context"]).toBe("https://schema.org");
  }
});

test("articles expose matching dates, author, breadcrumbs and usable share images", async ({ page, request }) => {
  for (const path of routes.filter((route) => route.startsWith("/writing/"))) {
    await page.goto(path);
    const data = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "{}");
    const article = data["@graph"].find((item: { "@type": string[] }) => Array.isArray(item["@type"]) && item["@type"].includes("BlogPosting"));
    expect(article.author.name).toBe("Kevinas Ramoska");
    expect(article.author.url).toBe(`${origin}/`);
    await expect(page.locator(`time[datetime="${article.datePublished}"]`)).toBeVisible();
    await expect(page.locator(`time[datetime="${article.dateModified}"]`)).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", { name: "Technical writing" })).toHaveAttribute("href", "/writing");
    const image = await request.get(`${path}/opengraph-image`);
    expect(image.ok()).toBe(true);
    expect(image.headers()["content-type"]).toContain("image/png");
    const buffer = await image.body();
    expect(buffer.readUInt32BE(16)).toBe(1200);
    expect(buffer.readUInt32BE(20)).toBe(630);
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", new RegExp(`${origin}${path}/opengraph-image`));
  }
});

test("robots and sitemap expose exactly the published pages and accurate dated entries", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain(`Sitemap: ${origin}/sitemap.xml`);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(locations.sort()).toEqual(routes.map((path) => `${origin}${path}`).sort());
  expect([...xml.matchAll(/<lastmod>/g)]).toHaveLength(routes.length);
  expect(xml).toContain("<image:loc>");
});

test("unknown content returns a genuine 404 with noindex", async ({ request }) => {
  for (const path of ["/projects/not-a-project", "/writing/not-an-article"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
    expect(await response.text()).toMatch(/name="robots" content="noindex"/);
  }
});
