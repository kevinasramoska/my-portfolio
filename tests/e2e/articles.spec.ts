import { expect, test } from "@playwright/test";
import { articles, articleReadTime } from "../../src/content/articles";

test("reading estimates handle empty text and round up at the word boundary", () => {
  expect(articleReadTime({ summary: "", sections: [] })).toBe("1 min read");
  expect(articleReadTime({ summary: "word ".repeat(200), sections: [] })).toBe("1 min read");
  expect(articleReadTime({ summary: "word ".repeat(201), sections: [] })).toBe("2 min read");
  expect(articleReadTime({ summary: "word\n\t".repeat(400), sections: [] })).toBe("2 min read");
  expect(articleReadTime({ summary: "word ".repeat(197), sections: [{
    heading: "Heading", paragraphs: ["Paragraph"], points: ["Point"],
    code: { caption: "Example", language: "C#", value: "code" },
  }] })).toBe("2 min read");
});

for (const article of articles) {
  test(`${article.slug}: index, article, sources and mobile code agree`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/writing");
    const card = page.locator("article").filter({ has: page.getByRole("heading", { name: article.title, exact: true }) });
    await expect(card).toContainText(articleReadTime(article));
    await card.getByRole("link", { name: "Read article" }).click();
    await expect(page).toHaveURL(`/writing/${article.slug}`);
    await expect(page.locator("article > div > header")).toContainText(articleReadTime(article));
    await expect(page.locator(`time[datetime="${article.updatedAt}"]`)).toBeVisible();

    const sources = page.getByRole("region", { name: "Sources and further reading" });
    for (const source of article.sources) {
      await expect(sources.getByRole("link", { name: source.label, exact: true })).toHaveAttribute("href", source.url);
    }

    const example = article.sections.find((section) => section.code)!;
    const code = page.getByLabel(`${example.heading}: code example`, { exact: true });
    await expect(code.locator("code")).toHaveText(example.code!.value);
    await code.focus();
    await expect(code).toBeFocused();
    // The code block can scroll, but it must not push the whole mobile page wider.
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
    const clippedParagraphs = await page.locator("article section p").evaluateAll((paragraphs) =>
      paragraphs.filter((paragraph) => {
        const bounds = paragraph.getBoundingClientRect();
        const range = document.createRange();
        range.selectNodeContents(paragraph);
        return [...range.getClientRects()].some((rect) => rect.right > bounds.right + 1 || rect.left < bounds.left - 1);
      }).map((paragraph) => paragraph.textContent),
    );
    expect(clippedParagraphs, "Long identifiers must wrap, not disappear behind the page clip").toEqual([]);
    if (await code.evaluate((element) => element.scrollWidth > element.clientWidth)) {
      await page.keyboard.press("ArrowRight");
      await expect.poll(() => code.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
    }
  });
}

