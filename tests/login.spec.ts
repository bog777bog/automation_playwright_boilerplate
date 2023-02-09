
import { test, expect } from '@playwright/test';
import { loginData } from '../data/users.data';
import { urlsData } from '../test_data/urls.data';
import { LoginPage } from './pages/login.page';
import { AccountPage } from './pages/account.page';

let loginPage;
let accountPage;

const initializePages = async (page) => {
    loginPage = new LoginPage(page);
    accountPage = new AccountPage(page);
};

test.beforeEach(async ({ page }, testInfo) => {
    await initializePages(page);
    console.log(`Running ${testInfo.title}`);
    await page.goto(urlsData.baseUrl);
  });

test('standart user is able to login and logout', async ({ page }) => {
    await loginPage.login(loginData.validUserEmail, loginData.password);
    await loginPage.checkLoginButtonIsNotVisible();

    await page.waitForURL(urlsData.plpUrl);

    await accountPage.logOutFromAccount();
    expect(await page.content()).toContain('Accepted usernames are');
});

test('problem user is able to login', async ({ page }) => {    
    await loginPage.login(loginData.problemUserEmail, loginData.password);
    await page.waitForURL(urlsData.plpUrl);
});

test('locked user is not able to login and error message is displayed on Login page', async ({ page }) => {
    await loginPage.login(loginData.lockedUserEmail, loginData.password);
    expect(await loginPage.getErrorMessage()).toMatch(loginData.lockedUserErrorMessage);
});

test('it is not allowed to login with invalid creds', async ({ page }) => {
    await loginPage.login('invalid', 'invalid');
    expect(await loginPage.getErrorMessage()).toMatch(loginData.invalidCredsErrorMessage);
});