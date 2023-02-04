
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';

test('standart user is able to login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('https://www.saucedemo.com');
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.checkLoginButtonIsNotVisible();

  await page.waitForURL('https://www.saucedemo.com/inventory.html');
});

test('problem user is able to login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await page.goto('https://www.saucedemo.com');
  await loginPage.login('problem_user', 'secret_sauce');

 await page.waitForURL('https://www.saucedemo.com/inventory.html');
});


test('locked user is not able to login and error message is displayed on Login page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('https://www.saucedemo.com');
  await loginPage.login('locked_out_user', 'secret_sauce');

  expect(await loginPage.getErrorMessage()).toMatch('Epic sadface: Sorry, this user has been locked out.');
});


