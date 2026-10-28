import { test, expect } from "@playwright/test";

test("class selection updates guides and survives reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Assassin Daggers" }).click();
  await expect(page.getByRole("combobox", { name: "Sınıfın" })).toHaveValue(
    "assassin",
  );
  await page.reload();
  await expect(page.getByRole("combobox", { name: "Sınıfın" })).toHaveValue(
    "assassin",
  );
  await page.getByRole("link", { name: "İncele: Assassin" }).click();
  await expect(
    page.getByRole("heading", { name: "Assassin rehberi" }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Beceriler", exact: true }).click();
  await page.getByRole("button", { name: "Stigma", exact: true }).click();
  await expect(page.locator("tbody tr")).not.toHaveCount(0);
  await expect(page.locator("tbody")).not.toContainText("Aktif");
  await page.getByRole("combobox", { name: "Sınıfın" }).selectOption("cleric");
  await expect(
    page.getByRole("heading", { name: "Cleric rehberi" }),
  ).toBeVisible();
});
test("Soul Binding slots, advisor, search deep links and class resets work", async ({
  page,
}) => {
  await page.goto("/soul-binding/");
  await page.getByRole("button", { name: "Eldiven", exact: true }).click();
  await page
    .getByLabel("Mevcut satır 1")
    .filter({ visible: true })
    .selectOption("Combat Speed");
  await expect(page.locator(".line-verdict:visible")).toContainText(
    "Şimdilik koru",
  );
  await page.getByRole("button", { name: "Son aşama", exact: true }).click();
  await expect(page.locator(".line-verdict:visible")).toContainText("Koru");
  await page.getByRole("combobox", { name: "Sınıfın" }).selectOption("ranger");
  await expect(
    page.getByLabel("Mevcut satır 1").filter({ visible: true }),
  ).toHaveValue("");
  await page
    .getByLabel("Rehber, beceri ve ekipman ara")
    .filter({ visible: true })
    .fill("Kolye");
  await page
    .locator(".search-results a")
    .filter({ hasText: "Kolye" })
    .first()
    .click();
  await expect(
    page.locator(".panel h2:visible").filter({ hasText: "Kolye" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Broş", exact: false }).click();
  await expect(
    page.getByLabel("Mevcut satır 1").filter({ visible: true }),
  ).toBeDisabled();
});
test("Arcana prevents duplicates and persists independent class loadouts", async ({
  page,
}) => {
  await page.goto("/arcana/");
  await page
    .getByLabel("Sınıfın")
    .filter({ visible: true })
    .selectOption("assassin");
  await page
    .locator(".arcana-card:visible")
    .filter({ hasText: "Parchment" })
    .click();
  const line1 = page
    .getByLabel("Arcana beceri satırı 1")
    .filter({ visible: true });
  const initial = await line1.inputValue();
  await expect(
    page
      .getByLabel("Arcana beceri satırı 2")
      .filter({ visible: true })
      .locator("option")
      .filter({ hasText: initial }),
  ).toHaveAttribute("disabled", "");
  await line1.selectOption("");
  await page
    .getByLabel("Kart seti")
    .filter({ visible: true })
    .selectOption("Magic");
  await page
    .getByLabel("Sınıfın")
    .filter({ visible: true })
    .selectOption("ranger");
  await expect(line1).not.toHaveValue("");
  await page
    .getByLabel("Sınıfın")
    .filter({ visible: true })
    .selectOption("assassin");
  await expect(line1).toHaveValue("");
  await page.reload();
  await page
    .locator(".arcana-card:visible")
    .filter({ hasText: "Parchment" })
    .click();
  await expect(line1).toHaveValue("");
  await expect(
    page.getByLabel("Kart seti").filter({ visible: true }),
  ).toHaveValue("Magic");
  await page.getByRole("button", { name: "Önerilen kartı geri yükle" }).click();
  await expect(line1).not.toHaveValue("");
});
test("Genus locks are gated by level, isolated by board and saved", async ({
  page,
}) => {
  await page.goto("/genus/");
  await expect(
    page.getByRole("button", { name: "Yuvayı kilitli işaretle" }),
  ).toBeDisabled();
  await page.getByRole("slider", { name: "Tablo seviyesi" }).fill("9");
  await page.getByRole("button", { name: "Yuvayı kilitli işaretle" }).click();
  await expect(
    page.getByRole("button", { name: "Kayıtlı kilidi kaldır" }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Fera", exact: true }).click();
  await expect(
    page.getByRole("slider", { name: "Tablo seviyesi" }),
  ).toHaveValue("1");
  await page.getByRole("tab", { name: "Special", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Kayıtlı kilidi kaldır" }),
  ).toBeVisible();
  await page.getByRole("slider", { name: "Tablo seviyesi" }).fill("2");
  await expect(
    page.getByRole("button", { name: "Yuvayı kilitli işaretle" }),
  ).toBeDisabled();
});
test("progression responds to inputs and saves checklist completion", async ({
  page,
}) => {
  await page.goto("/progression/");
  await page
    .getByRole("spinbutton", { name: "Mevcut GS / eşya seviyesi" })
    .fill("1600");
  await expect(
    page.getByRole("heading", { name: "5 boş Arcana yuvasını doldur" }),
  ).toBeVisible();
  await page
    .getByLabel("Dolu Arcana yuvası")
    .filter({ visible: true })
    .fill("5");
  await expect(
    page.getByRole("heading", { name: "5 boş Arcana yuvasını doldur" }),
  ).toHaveCount(0);
  await page.locator(".milestone-checklist input:visible").first().check();
  await page.reload();
  await expect(
    page.getByRole("spinbutton", { name: "Mevcut GS / eşya seviyesi" }),
  ).toHaveValue("1600");
  await expect(
    page.locator(".milestone-checklist input:visible").first(),
  ).toBeChecked();
  await page
    .getByLabel("Silah geliştirme seviyesi")
    .filter({ visible: true })
    .fill("-8");
  await expect(
    page.getByLabel("Silah geliştirme seviyesi").filter({ visible: true }),
  ).toHaveValue("0");
});
test("library and source filters, empty state and mobile navigation work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/guides/");
  await page
    .getByLabel("Rehber kütüphanesinde ara")
    .filter({ visible: true })
    .fill("nonsense-nothing");
  await expect(
    page.getByRole("heading", { name: "Eşleşen rehber yok" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Filtreleri temizle" }).click();
  await expect(page.locator(".guide-article:visible")).toHaveCount(14);
  await page.getByRole("button", { name: "Menüyü aç" }).click();
  await page
    .getByRole("link", { name: "Kaynaklar ve güncellemeler", exact: true })
    .click();
  await page
    .getByLabel("Kanıt düzeyi")
    .filter({ visible: true })
    .selectOption("Doğrulandı");
  await expect(page.locator(".source-entry:visible")).toHaveCount(1);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
});
test("all routes render without runtime errors, failed assets or horizontal overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  for (const path of [
    "/",
    "/classes/",
    "/arcana/",
    "/genus/",
    "/soul-binding/",
    "/progression/",
    "/guides/",
    "/sources/",
    ...[
      "gladiator",
      "templar",
      "assassin",
      "ranger",
      "sorcerer",
      "spiritmaster",
      "cleric",
      "chanter",
    ].map((c) => `/classes/${c}/`),
  ]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${path} at ${width}`,
      ).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});
