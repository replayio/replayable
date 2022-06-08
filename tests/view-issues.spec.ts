import { test, expect } from "@playwright/test";

test("View Open Issues", async ({ page }) => {
  await page.goto("/");
  const filter = page.locator(".view-Open");
  await expect(filter).toHaveText(/.*Open/);
});

test("View Closed Issues", async ({ page }) => {
  await page.goto("/");
  const filter = page.locator(".view-Closed");
  filter.click();
  await expect(filter).toHaveText(/(\d+) Closed/);
});
