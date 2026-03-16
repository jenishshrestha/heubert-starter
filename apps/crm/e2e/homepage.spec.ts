import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should display the hero section with logo and heading", async ({ page }) => {
    await page.goto("/");

    // Check for hero title
    await expect(page.getByRole("heading", { name: /The React \+ AI Stack for 2026/i })).toBeVisible();
  });

  test("should display the tech stack grid", async ({ page }) => {
    await page.goto("/");

    // Check for specific tech logos by their aria-label
    await expect(page.getByRole("img", { name: "Vite" })).toBeVisible();
    await expect(page.getByRole("img", { name: "React" })).toBeVisible();
    await expect(page.getByRole("img", { name: "TypeScript" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Tailwind CSS" })).toBeVisible();
  });

  test("should show tech name on hover", async ({ page }) => {
    await page.goto("/");

    const viteLogo = page.getByRole("img", { name: "Vite" });
    await viteLogo.hover();

    // The name label should become visible on hover
    await expect(page.getByText("Vite")).toBeVisible();
  });
});
