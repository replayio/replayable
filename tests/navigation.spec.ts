import { test, expect } from "@playwright/test";

test("Navigate to Issue", async ({ page, context }) => {
  await page.goto("localhost:3000");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("a.issue-link").first().click(),
  ]);

  await newPage.waitForLoadState();
  await newPage.waitForURL(/.*github.com.*/);
});

// test("Navigate to Replay", async ({ page, context }) => {
//   await page.goto("localhost:3000");

//   const link = await page.locator(".replay-link").first();
//   console.log(await link.getAttribute("href"));

//   const [newPage] = await Promise.all([
//     context.waitForEvent("page"),
//     await page.locator(".replay-link").first().click(),
//   ]);

//   await newPage.waitForLoadState();
//   console.log(await newPage.title());
//   await newPage.waitForURL(/.*replay\.io.*/);
// });
