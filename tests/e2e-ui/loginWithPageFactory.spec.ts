import { Data } from '@data/users.data';
import { test } from '@playwright/test';
import { expect } from '@playwright/test';
import { urlsData } from '@data/urls.data';
import { Application } from '@pages/application';
import { loginData } from '@data/users.data';
import { PageFactory } from '@pages/factoryPage';

// example of page initialiser https://github.com/microsoft/playwright/issues/12176
let APP: Application;

test.describe('Login', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await page.goto(urlsData.baseUrl);
  });

  test.only('standart user is able to login with valid creds and logout', async ({
    page,
  }) => {
    const pageFactory = new PageFactory(page);
    const loginPage = pageFactory.getLoginPage();
    const accountPage = pageFactory.getAccountPage();

    await loginPage.login(loginData.validUserEmail, loginData.password);
    await loginPage.checkLoginButtonIsNotVisible();

    await page.waitForURL(urlsData.plpUrl);

    await accountPage.logOutFromAccount();
    expect(await page.content()).toContain('Accepted usernames are');
  });
});
