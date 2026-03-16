import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should display the hero section", async ({ page }) => {
    await page.goto("/");

    // Check for hero title
    await expect(page.getByRole("heading", { name: /Heubert Starter/i })).toBeVisible();

    // Check for description
    await expect(
      page.getByText(/feature-driven monorepo starter/i),
    ).toBeVisible();

    // Check for CTA buttons
    await expect(page.getByRole("button", { name: /Get Started/i })).toBeVisible();
  });

  test("should display feature cards", async ({ page }) => {
    await page.goto("/");

    // Check for features section
    await expect(
      page.getByText(/Everything You Need to Build Modern Apps/i),
    ).toBeVisible();

    // Check for specific features
    await expect(page.getByText(/Vite/i)).toBeVisible();
    await expect(page.getByText(/TanStack Router/i)).toBeVisible();
    await expect(page.getByText(/TanStack Query/i)).toBeVisible();
  });

  test("should interact with demos", async ({ page }) => {
    await page.goto("/");

    // Test Query Demo
    await expect(page.getByText(/TanStack Query/i)).toBeVisible();
    const fetchButton = page.getByRole("button", { name: /Fetch Quote/i });
    await fetchButton.click();
    await expect(page.getByText(/fetching quote/i)).toBeVisible();
  });
});
