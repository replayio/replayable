import { test, expect } from "@playwright/test";

test("Navigate to Issue", async ({ page, context }) => {
  await page.goto("/");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("a.issue-link").first().click({ force: true }),
  ]);

  await newPage.waitForLoadState();
  await newPage.waitForURL(/.*github.com.*/);
});

test("Navigate to Replay", async ({ page, context }) => {
  await page.goto("/");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    await page.locator(".replay-link").first().click({ force: true }),
  ]);

  await newPage.waitForLoadState();
  await newPage.waitForURL(/.*replay\.io.*/);
});

test("Navigate to OSS Guide", async ({page, context}) => {
  await page.goto("/");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    await page.locator('text=OSS Guide').click()
  ])

  await newPage.waitForLoadState();
  await newPage.waitForURL("https://docs.replay.io/docs/replay-oss-751fc053a0a14c32812c4766d7c65e4d")
  await newPage.waitForSelector('text=Replay + OSS')
})

test("Navigate to About", async ({page}) => {
  await page.goto("/");

  await page.locator('text=About').first().click();

  const firstParagraph = await page.locator('p').first();

  await expect(firstParagraph).toHaveText("Replayable is a collection of Github Issues that include replays.")
})
