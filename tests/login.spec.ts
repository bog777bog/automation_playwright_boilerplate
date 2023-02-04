
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { loginData } from '../test_data/login.data';
import { urlsData } from '../test_data/urls.data';


test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await page.goto(urlsData.baseUrl);
  });

test('standart user is able to login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(loginData.validUserEmail, loginData.password);
    await loginPage.checkLoginButtonIsNotVisible();

    await page.waitForURL(urlsData.plpUrl);
});

test('problem user is able to login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.login(loginData.problemUserEmail, loginData.password);

    await page.waitForURL(urlsData.plpUrl);
});

test('locked user is not able to login and error message is displayed on Login page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(loginData.lockedUserEmail, loginData.password);

    expect(await loginPage.getErrorMessage()).toMatch(loginData.lockedUserErrorMessage);
});

test('it is not allowed to login with invalid creds', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('invalid', 'invalid');
    expect(await loginPage.getErrorMessage()).toMatch(loginData.invalidCredsErrorMessage);
});


