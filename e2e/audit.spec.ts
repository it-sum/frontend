import { expect, test } from "@playwright/test";

const viewportWidths = [360, 390, 768, 1280, 1440];

test("localized homepages fit all audited widths and themes", async ({
  page,
}) => {
  for (const locale of ["ar", "en"] as const) {
    await page.goto(`/${locale}`);
    await expect(page.locator("main > section h1")).toBeVisible();

    for (const theme of ["light", "dark"] as const) {
      await page.evaluate((nextTheme) => {
        localStorage.setItem("theme", nextTheme);
        window.dispatchEvent(new Event("theme-change"));
      }, theme);
      await page.waitForFunction(
        (expectedTheme) =>
          document.documentElement.classList.contains("dark") ===
          (expectedTheme === "dark"),
        theme,
      );

      for (const width of viewportWidths) {
        await page.setViewportSize({ width, height: 900 });
        const layout = await page.evaluate(() => {
          const hero = document.querySelector("main > section");
          const heading = hero?.querySelector("h1");
          const artwork = hero?.querySelector('img[alt=""]')?.parentElement;
          const primaryLink = hero?.querySelector("a");
          const headingRect = heading?.getBoundingClientRect();
          const artworkRect = artwork?.getBoundingClientRect();

          return {
            direction: hero ? getComputedStyle(hero).direction : null,
            dark: document.documentElement.classList.contains("dark"),
            documentWidth: document.documentElement.scrollWidth,
            mainCount: document.querySelectorAll("main").length,
            headingCount: document.querySelectorAll("h1").length,
            artworkOverlapsHeading: Boolean(
              headingRect &&
              artworkRect &&
              headingRect.x < artworkRect.right &&
              headingRect.right > artworkRect.x &&
              headingRect.y < artworkRect.bottom &&
              headingRect.bottom > artworkRect.y,
            ),
            primaryLinkFits: Boolean(
              primaryLink &&
              primaryLink.scrollHeight <= primaryLink.clientHeight &&
              primaryLink.getBoundingClientRect().right <= innerWidth &&
              primaryLink.getBoundingClientRect().left >= 0,
            ),
          };
        });

        expect(layout.direction).toBe(locale === "ar" ? "rtl" : "ltr");
        expect(layout.dark).toBe(theme === "dark");
        expect(layout.documentWidth).toBe(width);
        expect(layout.mainCount).toBe(1);
        expect(layout.headingCount).toBe(1);
        expect(layout.artworkOverlapsHeading).toBe(false);
        expect(layout.primaryLinkFits).toBe(true);
      }
    }
  }
});

test("resource and subject pages state their availability honestly", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("/ar/resources");
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator("main")).toContainText("المكتبة غير متاحة بعد");
  const resourceLinks = await page
    .locator("main a")
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).pathname),
    );
  expect(resourceLinks).not.toContain("/ar/resources");
  expect(resourceLinks).not.toContain("/ar/get-started");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );

  await page.goto("/ar/subjects");
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator("main")).toContainText("غير متاحة بعد");
  await expect(page.getByText("page", { exact: true })).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "عرض مجالات الدراسة" }),
  ).toHaveAttribute("href", "/ar/departments");
});

test("mobile navigation closes with Escape and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ar");

  const trigger = page.getByRole("button", { name: "فتح القائمة" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "القائمة الرئيسية" });
  await expect(dialog).toBeVisible();

  const closeButton = dialog.getByRole("button", { name: "إغلاق القائمة" });
  await expect(closeButton).toBeFocused();
  const target = await closeButton.boundingBox();
  expect(target?.width).toBeGreaterThanOrEqual(44);
  expect(target?.height).toBeGreaterThanOrEqual(44);

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("mobile navigation switches the current page language", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ar");
  await page.getByRole("button", { name: "فتح القائمة" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "تغيير اللغة إلى EN" })
    .click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("get-started and an unauthenticated student dashboard route to login", async ({
  page,
}) => {
  await page.goto("/ar/get-started");
  await expect(page).toHaveURL(/\/ar\/login$/);

  await page.goto("/ar/dashboard");
  await expect(page).toHaveURL(/\/ar\/login$/, { timeout: 10_000 });
});
