import { test, expect, type Page } from "@playwright/test";

async function next(page: Page) {
  await page.getByRole("button", { name: "Devam et", exact: true }).click();
}
async function finish(page: Page) {
  await page.getByRole("button", { name: "Gelişim planımı oluştur" }).click();
  await expect(page.locator(".coach-dashboard")).toBeVisible();
}

test("ilk açılış, kişisel öncelikler, güncelleme ve sınıf kayıtları", async ({
  page,
  baseURL,
}) => {
  await page.goto(baseURL!.replace(/\/?$/, "/"));
  await expect(
    page.getByRole("heading", { name: "Karakterini tanıyalım." }),
  ).toBeVisible();
  await page.screenshot({ path: "reports/koc-ilk-acilis.png", fullPage: true });
  await next(page);
  await expect(
    page.getByRole("heading", { name: "Karakterini tanıyalım." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Assassin Daggers" }).click();
  await page.getByLabel("Mevcut GS / eşya seviyesi").fill("1800");
  await page
    .getByLabel("45. seviye hikâyeyi tamamladın mı?")
    .selectOption("yes");
  await page.getByLabel("Boş ekipman yuvası").fill("0");
  await next(page);
  await page.getByLabel("Heart Gore seviyesi").fill("10");
  await page.getByLabel("Silah geliştirme seviyesi").fill("12");
  await page.getByLabel("Dolu Arcana yuvası").fill("2");
  await page.getByLabel("En düşük Genus tablo seviyesi").fill("4");
  await next(page);
  await page.getByLabel("Bugün ayırabileceğin süre").selectOption("15");
  await finish(page);
  await expect(page.locator(".coach-focus h2")).toHaveText(
    "Heart Gore: 10 → 16",
  );
  await expect(page.locator(".coach-task")).toHaveCount(1);
  await page.screenshot({
    path: "reports/koc-gelisim-plani.png",
    fullPage: true,
  });
  await page.reload();
  await expect(page.locator(".coach-focus h2")).toHaveText(
    "Heart Gore: 10 → 16",
  );
  await page.getByRole("button", { name: "Durumumu güncelle" }).click();
  await expect(page.getByLabel("Mevcut GS / eşya seviyesi")).toHaveValue(
    "1800",
  );
  await next(page);
  await page.getByLabel("Heart Gore seviyesi").fill("16");
  await next(page);
  await finish(page);
  await expect(page.locator(".coach-focus h2")).toHaveText(
    "3 boş Arcana yuvasını doldur",
  );
  await expect(
    page.locator(".coach-area.ready").filter({ hasText: "Heart Gore" }),
  ).toBeVisible();
  await page.getByLabel("Sınıfın").selectOption("ranger");
  await expect(
    page.getByRole("heading", { name: "Ranger için yolunu çizelim." }),
  ).toBeVisible();
  await expect(page.locator(".coach-focus")).toHaveCount(0);
  await page.getByLabel("Sınıfın").selectOption("assassin");
  await expect(page.locator(".coach-focus h2")).toHaveText(
    "3 boş Arcana yuvasını doldur",
  );
  await page
    .locator(".coach-focus")
    .getByRole("link", { name: "Arcana planını aç" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Beş kart. Uyumlu bir yapı." }),
  ).toBeVisible();
  await expect(page.getByLabel("Sınıfın")).toHaveValue("assassin");
});

test("bilinmeyen alanlar sorun sayılmaz ve erken Arcana ertelenir", async ({
  page,
  baseURL,
}) => {
  await page.goto(baseURL!.replace(/\/?$/, "/"));
  await page.getByLabel("Mevcut GS / eşya seviyesi").fill("1000");
  await next(page);
  await next(page);
  await finish(page);
  await expect(page.locator(".health-total>strong")).toHaveText("0");
  await expect(page.locator(".coach-area.check")).toHaveCount(7);
  await expect(page.locator(".coach-area.later")).toContainText(
    "Arcana farmını sonraya planla",
  );
  await expect(page.locator(".coach-focus")).toContainText(
    "Henüz sorun sayılmadı",
  );
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "İlerleme", exact: true })
    .click();
  await expect(
    page
      .locator(".assessment-profile-details dd")
      .filter({ hasText: "Belirtilmedi" }),
  ).toHaveCount(4);
  await expect(
    page.getByRole("button", { name: "Karakter durumumu güncelle" }),
  ).toBeVisible();
});

test("mobil değerlendirme, geri dönüş ve rehberleri keşfetme", async ({
  page,
  baseURL,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL!.replace(/\/?$/, "/"));
  await page.getByLabel("Mevcut GS / eşya seviyesi").fill("1700");
  await next(page);
  await page.getByLabel("Dolu Arcana yuvası").fill("1");
  await page.screenshot({
    path: "reports/koc-mobil-degerlendirme.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Geri", exact: true }).click();
  await expect(page.getByLabel("Mevcut GS / eşya seviyesi")).toHaveValue(
    "1700",
  );
  await next(page);
  await expect(page.getByLabel("Dolu Arcana yuvası")).toHaveValue("1");
  await next(page);
  await finish(page);
  await expect(page.locator(".coach-focus h2")).toHaveText(
    "4 boş Arcana yuvasını doldur",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "reports/koc-mobil-plan.png", fullPage: true });
  await page.getByRole("button", { name: "Menüyü aç" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Arcana planlayıcı", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Beş kart. Uyumlu bir yapı." }),
  ).toBeVisible();
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page
    .getByRole("button", { name: "Şimdilik rehberleri keşfet" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Beş kart. Uyumlu bir yapı." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Karakter analizi", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Karakterini tanıyalım." }),
  ).toBeVisible();
});
