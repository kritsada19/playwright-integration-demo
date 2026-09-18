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

test("Bottom-Up DRIVER: Driver A -> B Add Cart", async ({ browser }) => {
  const context = await browser.newContext();

  try {
    const page = await driverOpenShopping(context);

    await expect(page.locator('[data-test="title"]')).toContainText(
      "Your Cart",
    );

  } finally {
    await context.close();
  }
});
