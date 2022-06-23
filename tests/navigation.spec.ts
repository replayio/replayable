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
