import { test, expect, Page } from '@playwright/test';
import { loginData } from '@data/users.data';
import { urlsData } from '@data/urls.data';
import { Application } from '@pages/index';

let APP: Application;

test.describe('Login', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    APP = new Application(page);
    console.log(`Running ${testInfo.title}`);
    await page.goto(urlsData.baseUrl);
  });

  test(
    'standart user is able to login with valid creds and logout',
    { tag: '@e2e' },
    async ({ page }) => {
      await APP.loginPage.login(loginData.validUserEmail, loginData.password);
      await APP.loginPage.checkLoginButtonIsNotVisible();

      await page.waitForURL(urlsData.plpUrl);

      await APP.accountPage.logOutFromAccount();
      expect(await page.content()).toContain('Accepted usernames are');
    },
  );

  test('problem user is able to login', { tag: '@e2e' }, async ({ page }) => {
    await APP.loginPage.login(loginData.problemUserEmail, loginData.password);
    await page.waitForURL(urlsData.plpUrl);
  });

  test(
    'locked user is not able to login and error message is displayed on Login page',
    { tag: '@e2e' },
    async ({ page }) => {
      await APP.loginPage.login(loginData.lockedUserEmail, loginData.password);
      expect(await APP.loginPage.getErrorMessage()).toMatch(
        loginData.lockedUserErrorMessage,
      );
    },
  );

  test(
    'it is not allowed to login with invalid creds',
    { tag: '@e2e' },
    async ({ page }) => {
      await APP.loginPage.login('invalid', 'invalid');
      expect(await APP.loginPage.getErrorMessage()).toMatch(
        loginData.invalidCredsErrorMessage,
      );
    },
  );

  test(
    'it is not allowed to login with empty fields',
    { tag: '@e2e' },
    async ({ page }) => {
      await APP.loginPage.login('', '');
      expect(await APP.loginPage.getErrorMessage()).toMatch(
        loginData.emptyCredsErrorMessage,
      );
    },
  );
});
