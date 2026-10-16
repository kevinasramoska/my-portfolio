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
  {
    path: "/writing/designing-safe-transaction-correction",
    heading: "Designing safe transaction correction",
  },
  { path: "/projects", heading: "Software engineering projects" },
  { path: "/writing", heading: "Technical writing" },
  { path: "/writing/role-based-authorization-beyond-roles", heading: "Role-based authorization beyond user roles" },
  { path: "/writing/testing-aspnet-with-playwright", heading: "Testing ASP.NET applications with Playwright" },
  { path: "/writing/kafka-lessons-from-production-style-workflows", heading: "Kafka lessons from production-style workflows" },
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
  test("serves the production security header baseline", async ({ request }) => {
    const response = await request.get("/");
    const headers = response.headers();
    const contentSecurityPolicy = headers["content-security-policy"];

    expect(response.ok()).toBe(true);
    expect(contentSecurityPolicy).toContain("default-src 'self'");
    expect(contentSecurityPolicy).toContain("object-src 'none'");
    expect(contentSecurityPolicy).toContain("frame-ancestors 'none'");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-powered-by"]).toBeUndefined();
  });

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

  test("homepage presents verified judo career profiles", async ({ page }) => {
    await page.goto("/#judo");

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "On the mat since six. Competing for Ireland.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Official IJF profile" }),
    ).toHaveAttribute("href", "https://www.ijf.org/judoka/45746");
    await expect(
      page.getByRole("link", { name: "JudoInside results" }),
    ).toHaveAttribute(
      "href",
      "https://judoinside.com/judoka/118100/Kevinas_Ramoska/judo-career",
    );
  });

  test("homepage presents current focus, credentials, and writing", async ({
    page,
  }) => {
    await page.goto("/#current");

    await expect(
      page.getByRole("heading", {
        name: "Building reliable business software and sharpening the systems around it",
      }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "View credential" })).toHaveAttribute(
      "href",
      "https://learn.microsoft.com/en-us/users/kevinasramoska-0112/credentials/26a7611366eb82f2",
    );

    await page.goto("/#writing");
    await expect(page.getByRole("link", { name: "Read article" })).toHaveCount(4);
  });

  test("resume links serve the current PDF and BWG roles are visible", async ({ page, request }) => {
    await page.goto("/#experience");
    await expect(page.getByRole("heading", { name: "Junior Full Stack Engineer", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Full Stack Developer Intern", exact: true })).toBeVisible();

    const resumePath = await page.getByRole("link", { name: "View Resume", exact: true }).getAttribute("href");
    expect(resumePath).toBeTruthy();
    const response = await request.get(resumePath!);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  });

  test("case studies use real product screenshots and verified metrics", async ({
    page,
  }) => {
    await page.goto("/projects/crypto-portfolio-tracker");

    await expect(
      page.getByRole("img", {
        name: "CryptoTracker dashboard showing market prices and portfolio profit and loss",
      }).first(),
    ).toBeVisible();
    await expect(page.getByText("80", { exact: true })).toBeVisible();
    await expect(page.getByText("passing checks", { exact: true })).toBeVisible();
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
