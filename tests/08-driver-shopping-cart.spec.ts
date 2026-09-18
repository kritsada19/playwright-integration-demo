import { test, expect, BrowserContext, Page } from "@playwright/test";

async function driverOpenShopping(context: BrowserContext): Promise<Page> {
  await context.addCookies([
    {
      name: "session-username",

      value: "standard_user",

      domain: "www.saucedemo.com",

      path: "/",
    },
  ]);

  const page = await context.newPage();

  await page.goto("https://www.saucedemo.com/cart.html");

  await expect(page.locator(".cart_list")).toBeVisible();

  return page;
}

test("Bottom-Up DRIVER: Driver A -> B Add Cart", async ({
  browser,
}) => {
  const context = await browser.newContext();

  try {
    // ===================================================

    // Driver A เรียก Layer ด้านล่าง

    // ===================================================

    const page = await driverOpenShopping(context);

    // ===================================================

    // B = Inventory จริง

    // ===================================================

    await expect(page.locator(".inventory_item")).toHaveCount(0);

    // ===================================================

    // E = Add Cart จริง

    // ===================================================

    await page

      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')

      .click();

    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  } finally {
    await context.close();
  }
});
