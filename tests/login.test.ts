import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  test('TC-01 Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.successfulLogin('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('TC-02 Error message for locked users', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const errorText = await loginPage.failedLogin('locked_out_user', 'secret_sauce');
    expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
  });

  test('TC-03 Login with invalid credentials ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const errorText = await loginPage.failedLogin('wrong_password', 'wrong_password');
    expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  test('TC-04 Login fields are kept empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const errorText = await loginPage.failedLogin('', '');
    expect(errorText).toContain('Epic sadface: Username is required');
  });
})