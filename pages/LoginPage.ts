import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  /**
   * Logs in and waits for the post-login inventory page.
   * Use valid credentials (e.g. standard_user / secret_sauce).
   */
  async successfulLogin(username: string, password: string): Promise<void> {
    await this.goto();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/inventory.html');
  }

  /**
   * Attempts login, expects an error banner to appear, and returns its text.
   */
  async failedLogin(username: string, password: string): Promise<string> {
    await this.goto();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.errorMessage.waitFor({ state: 'visible' });
    return (await this.getErrorMessageText()) ?? '';
  }

  async getErrorMessageText(): Promise<string | null> {
    const text = await this.errorMessage.textContent();
    return text?.trim() ?? null;
  }

  
}

