import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.successfulLogin('standard_user', 'secret_sauce');
  });

  test('TC-05 All products are displayed on the inventory page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
  });

  test('TC-06 Sort product name by Ascending Order (A-Z)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getProductNames();
    expect(names[0]).toBe('Sauce Labs Backpack');
  });

  test('TC-07 Sort product name by Descending Order (Z-A)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();
    expect(names[0]).toBe('Test.allTheThings() T-Shirt (Red)');
  });

  test('TC-08 Sort product by Price (Low to High)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    expect(prices[0]).toBe(7.99);
  });

  test('TC-09 Sort product by Price (High to Low)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();
    expect(prices[0]).toBe(49.99);
  });

  test('TC-10 Each product displays name, description, price and image', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const items = inventoryPage.inventoryItems;
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      await expect(item.getByTestId('inventory-item-name')).toBeVisible();
      await expect(item.getByTestId('inventory-item-desc')).toBeVisible();
      await expect(item.getByTestId('inventory-item-price')).toBeVisible();
      await expect(item.locator('img.inventory_item_img')).toBeVisible();
    }
  });
});
