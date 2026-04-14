import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.successfulLogin('standard_user', 'secret_sauce');
  });

  test('TC-11 Add a product to cart - cart badge shows 1', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
  });

  test('TC-12 Remove a product from cart - cart badge shows 0', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('Sauce Labs Backpack');
    const item = inventoryPage.inventoryItems.filter({ hasText: 'Sauce Labs Backpack' });
    await item.getByRole('button', { name: /remove/i }).click();
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  });

  test('TC-13 Cart badge shows correct count after adding two products', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);
  });

  test('TC-14 Cart item persists after navigating away', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('Sauce Labs Backpack');

    await page.getByTestId('shopping-cart-link').click();
    await page.waitForURL('**/cart.html');

    const cartPage = new CartPage(page);
    const names = await cartPage.getItemNames();
    expect(names).toContain('Sauce Labs Backpack');

    await page.goto('https://www.saucedemo.com/inventory.html');
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
  });
});
