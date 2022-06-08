import { test, expect } from "@playwright/test";

test("Filter by label", async ({ page }) => {
  await page.goto("localhost:3000");

  const label = await page.locator(".issue-label").first();
  const labelValue = await label.textContent();

  await label.click();
  // TODO: Assert that the issues are cleared

  //   Wait for the new issues to come back with this value
  const newLabel = await page
    .locator(".issue-label", { hasText: labelValue })
    .first();
  await expect(newLabel).toHaveText(labelValue);
});
