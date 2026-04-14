import type { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  // Step 1 locators (checkout-step-one.html)
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;
  readonly cancelButton: Locator;

  // Step 2 locators (checkout-step-two.html)
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.errorMessage = page.getByTestId('error');
    this.cancelButton = page.getByTestId('cancel');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
    await this.page.waitForURL('**/checkout-step-two.html');
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
    await this.page.waitForURL('**/checkout-complete.html');
  }

  async getOrderTotal(): Promise<string> {
    return (await this.totalLabel.textContent())?.trim() ?? '';
  }

  async completeCheckout(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillShippingInfo(firstName, lastName, postalCode);
    await this.continueToOverview();
    await this.finishCheckout();
  }
}
