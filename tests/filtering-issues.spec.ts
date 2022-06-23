import { test, expect } from "@playwright/test";

test("Filter by label", async ({ page }) => {
  await page.goto("/");

  const label = await page.locator(".issue-label").first();
  const labelValue = await label.textContent();

  await label.click();

  // assert that filter label has labelValue

  const filterLabel = await page.locator(".filter-label")
  await expect(filterLabel).toHaveText(labelValue)

  // assert a label with labelValue exists on page
  const newLabel = await page
    .locator(".issue-label", { hasText: labelValue })
    .first();

  await expect(newLabel).toBeVisible()

});

test("Filter by repo", async ({page})=> {
  await page.goto('/')

  // get first repo link name and click
  const repoLink = await page.locator(".repo-link").first();
  const repoName = await repoLink.textContent();

  await repoLink.click()

  // assert repo filter has text of repo name
  const filterRepo = await page.locator(".filter-repo")
  await expect(filterRepo).toHaveText(repoName)

  // assert repolink doesn't exist
  const newRepoLink = await page.locator(".repo-link")
  await expect(newRepoLink).toHaveCount(0)
})