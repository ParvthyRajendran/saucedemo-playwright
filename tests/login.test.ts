import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  test('successful login with standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.successfulLogin('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('locked_out_user sees error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const errorText = await loginPage.failedLogin('locked_out_user', 'secret_sauce');
    expect(errorText).toContain('Sorry, this user has been locked out');
  });

  test('wrong credentials show error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const errorText = await loginPage.failedLogin('wrong_password', 'wrong_password');
    expect(errorText).toContain('Username and password do not match');
  });
});