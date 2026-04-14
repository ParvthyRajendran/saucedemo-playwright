import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.successfulLogin('standard_user', 'secret_sauce');

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('Sauce Labs Backpack');

    await page.getByTestId('shopping-cart-link').click();
    await page.waitForURL('**/cart.html');

    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
  });

  test('TC-15 Clicking checkout redirects to checkout-step-one.html', async ({ page }) => {
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);
  });

  test('TC-16 Fill valid details and redirect to checkout-step-two.html', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await checkoutPage.continueToOverview();
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
  });

  test('TC-17 Empty fields show error message', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.continueButton.click();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Error: First Name is required');
  });

  test('TC-18 Order summary shows item and total on checkout-step-two.html', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await checkoutPage.continueToOverview();

    await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
    const total = await checkoutPage.getOrderTotal();
    expect(total).toMatch(/Total: \$\d+\.\d{2}/);
  });

  test('TC-19 Full checkout redirects to checkout-complete.html with confirmation', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.completeCheckout('John', 'Doe', '12345');

    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });
});
