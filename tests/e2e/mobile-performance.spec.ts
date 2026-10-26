import { expect, test } from "@playwright/test";

test("hero text stays visible at the first animation frame without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  try {
    const page = await context.newPage();
    await page.goto("/");
    const copy = page.locator(".hero-copy");
    await copy.evaluate((element) => {
      for (const animation of element.getAnimations()) {
        animation.pause();
        animation.currentTime = 0;
      }
    });
    await expect(copy).toHaveCSS("opacity", "1");
    await expect(copy.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
  } finally {
    await context.close();
  }
});

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`mobile section links reach their content with ${reducedMotion} motion`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.emulateMedia({ reducedMotion });
    await page.goto("/#writing");
    await expect(page.locator("#writing").getByRole("heading", { level: 2 })).toBeInViewport();
    // Jump far down, back up, and through both large and small sections.
    for (const name of ["Contact", "Experience", "Projects", "Judo", "Writing"]) {
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name, exact: true }).click();
      const section = page.locator(`#${name.toLowerCase()}`);
      await expect(section.getByRole("heading", { level: 2 }).first()).toBeInViewport();
      await expect(section).toHaveCSS("opacity", "1");
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
    }
    await page.locator("#writing").getByRole("link", { name: "Read article" }).first().click();
    await expect(page).toHaveURL("/writing/designing-safe-transaction-correction");
  });
}
