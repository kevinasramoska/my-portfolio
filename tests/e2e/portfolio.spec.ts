import AxeBuilder from "@axe-core/playwright";
import {
  expect,
  test,
  type Page,
  type TestInfo,
} from "@playwright/test";

const routes = [
  {
    path: "/",
    heading: "Hi, I’m Kevinas Ramoska",
  },
  {
    path: "/projects/crypto-portfolio-tracker",
    heading: "Crypto Portfolio Tracker",
  },
  {
    path: "/projects/rentright",
    heading: "RentRight Property Management",
  },
] as const;

async function expectNoAccessibilityViolations(
  page: Page,
  testInfo: TestInfo,
) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  await testInfo.attach("axe-results", {
    body: JSON.stringify(results, null, 2),
    contentType: "application/json",
  });

  expect(
    results.violations,
    JSON.stringify(results.violations, null, 2),
  ).toEqual([]);
}

test.describe("portfolio routes", () => {
  for (const route of routes) {
    test(
      `${route.path} renders and passes automated accessibility checks`,
      async ({ page }, testInfo) => {
        const response = await page.goto(route.path);

        expect(response?.ok()).toBe(true);
        await expect(
          page.getByRole("heading", { level: 1, name: route.heading }),
        ).toBeVisible();
        await expectNoAccessibilityViolations(page, testInfo);
      },
    );
  }

  test("homepage case-study links navigate to published projects", async ({
    page,
  }) => {
    await page.goto("/");

    const caseStudyLinks = page.getByRole("link", {
      name: "Explore case study",
    });
    await expect(caseStudyLinks).toHaveCount(2);

    await caseStudyLinks.first().click();
    await expect(page).toHaveURL(/\/projects\/crypto-portfolio-tracker$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Crypto Portfolio Tracker",
      }),
    ).toBeVisible();
  });
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("opens, closes, restores focus, and remains accessible", async ({
    page,
  }, testInfo) => {
    await page.goto("/");

    const openButton = page.getByRole("button", {
      name: "Open navigation menu",
    });
    await expect(openButton).toHaveAttribute("aria-expanded", "false");

    await openButton.click();

    const closeButton = page.getByRole("button", {
      name: "Close navigation menu",
    });
    await expect(closeButton).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeVisible();
    await expectNoAccessibilityViolations(page, testInfo);

    await page.keyboard.press("Escape");

    await expect(openButton).toHaveAttribute("aria-expanded", "false");
    await expect(openButton).toBeFocused();

    await openButton.click();
    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Projects", exact: true })
      .click();

    await expect(page).toHaveURL(/\/#projects$/);
    await expect(openButton).toHaveAttribute("aria-expanded", "false");
    await expect(
      page.getByRole("heading", {
        name: "Engineering evidence, not just technology lists",
      }),
    ).toBeVisible();

    const horizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(horizontalOverflow).toBe(0);
  });
});
