import { Data } from '../../data/users.data';
import { test } from '../fixtures/fixturePages';
import { expect } from '@playwright/test';
import { urlsData } from '../../data/urls.data';
import { Application } from '../pages/application';
import { loginData } from '../../data/users.data';


// example of page initialiser https://github.com/microsoft/playwright/issues/12176
let APP: Application;

test.describe('Login', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        APP = new Application(page);
        console.log(`Running ${testInfo.title}`);
        await page.goto(urlsData.baseUrl);
    });

    test('standart user is able to login with valid creds and logout', async ({
        page,
        loginPage,
        accountPage 
    }) => {
        await loginPage.login(loginData.validUserEmail, loginData.password);
        await loginPage.checkLoginButtonIsNotVisible();

        await page.waitForURL(urlsData.plpUrl);

        await accountPage.logOutFromAccount();
        expect(await page.content()).toContain('Accepted usernames are');
    });
});