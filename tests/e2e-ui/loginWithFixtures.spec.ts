import { Data } from '../../data/users.data';
import { test } from '../../fixtures/fixturePages';
import { expect } from '@playwright/test';
import { urlsData } from '../../data/urls.data';
import { Application } from '../pages/application';
import { userData } from '../../data/login.data';
import { authenticated } from '../../fixtures/fixtures';

// example of page initialiser https://github.com/microsoft/playwright/issues/12176
test.describe.configure({ mode: 'serial' });

test.describe('Login', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        // APP = new Application(page);
        console.log(`Running ${testInfo.title}`);
        await page.goto(urlsData.baseUrl);
    });

    [
    'validUser',
    'problemUser',
    'lockedUser'
    ].forEach(userType => {
        test(`${userType} user is able to login with valid creds and logout`, async ({
            page,
            loginPage,
            accountPage
        }) => {
            await loginPage.login(userData[userType].email, userData[userType].password);
            await loginPage.checkLoginButtonIsNotVisible();

            await page.waitForURL(urlsData.plpUrl, {timeout: 10000 });

            await accountPage.logOutFromAccount();
            expect(await page.content()).toContain('Accepted usernames are');
        });
    });


    authenticated('user logs out form My Account', async ({ authenticatedPage }) => {
        await test.step('Logging out from My Account', async () => {
            await authenticatedPage.logOutFromAccount();
        });
    });

    test.only('problem user is able to login', async ({ page, APP }) => {
        await APP.loginPage.login(userData.problemUser.email, userData.problemUser.password);
        await page.waitForURL(urlsData.plpUrl);
        await APP.accountPage.logOutFromAccount();
        expect(await page.content()).toContain('Accepted usernames are');
    });
});
