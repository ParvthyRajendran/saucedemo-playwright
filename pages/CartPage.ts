import type { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly itemQuantities: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly checkoutButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.getByTestId('inventory-item');
    this.itemQuantities = page.getByTestId('item-quantity');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.checkoutButton = page.getByTestId('checkout');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartBadgeCount(): Promise<number> {
    const text = await this.cartBadge.textContent();
    return parseInt(text ?? '0', 10);
  }

  async removeItem(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    const removeButton = item.getByRole('button', { name: /remove/i });
    await removeButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  async getItemNames(): Promise<string[]> {
    return await this.itemNames.allTextContents();
  }
}
