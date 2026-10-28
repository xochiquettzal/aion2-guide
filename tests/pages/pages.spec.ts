import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("aion2-fieldguide-v1"))
      localStorage.setItem(
        "aion2-fieldguide-v1",
        JSON.stringify({ onboardingDismissed: true }),
      );
  });
});

test("statik alt dizinde tüm sayfalar Türkçe açılır; masaüstü ve mobil taşmaz", async ({
  page,
  baseURL,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  for (const route of [
    "",
    "classes/",
    "arcana/",
    "genus/",
    "soul-binding/",
    "progression/",
    "guides/",
    "sources/",
    ...[
      "gladiator",
      "templar",
      "assassin",
      "ranger",
      "sorcerer",
      "spiritmaster",
      "cleric",
      "chanter",
    ].map((c) => `classes/${c}/`),
  ]) {
    await page.goto(baseURL + route);
    await expect(page.locator("html")).toHaveAttribute("lang", "tr");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${route} at ${width}`,
      ).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});

test("Pages bağlantıları, yenileme, Türkçe arama ve kayıtlı plan çalışır", async ({
  page,
  baseURL,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  await page.goto(baseURL!);
  // Client-side navigation and prefetch must remain inside the repository path.
  for (const [label, route] of [
    ["Arcana planlayıcı", "arcana/"],
    ["İlerleme", "progression/"],
    ["Sınıf rehberleri 08", "classes/"],
  ]) {
    await page
      .getByRole("navigation")
      .getByRole("link", { name: label, exact: true })
      .click();
    await expect(page).toHaveURL(baseURL! + route);
    await expect(
      page
        .getByRole("navigation")
        .getByRole("link", { name: label, exact: true }),
    ).toHaveClass("active");
  }
  await page.getByLabel("Sınıfın").selectOption("assassin");
  await page.getByLabel("Rehber, beceri ve ekipman ara").fill("Assassin");
  await page.locator(".search-results a").first().click();
  await expect(page).toHaveURL(baseURL! + "classes/assassin/");
  await page.getByLabel("Sınıfın").selectOption("cleric");
  await expect(page).toHaveURL(baseURL! + "classes/cleric/");
  await page.reload();
  await expect(page.getByLabel("Sınıfın")).toHaveValue("cleric");
  await expect(
    page.getByRole("heading", { name: "Cleric rehberi" }),
  ).toBeVisible();
  await page.getByLabel("Rehber, beceri ve ekipman ara").fill("İLERLEME");
  await expect(
    page.locator(".search-results a").filter({ hasText: "İlerleme" }).first(),
  ).toBeVisible();
  await page.getByLabel("Rehber, beceri ve ekipman ara").fill("KOLYE");
  await page
    .locator(".search-results a")
    .filter({ hasText: "Kolye" })
    .first()
    .click();
  await expect(
    page.locator(".panel h2:visible").filter({ hasText: "Kolye" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.locator(".panel h2:visible").filter({ hasText: "Kolye" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
