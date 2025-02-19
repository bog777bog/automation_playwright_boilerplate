import { test, expect, Page } from '@playwright/test';
import { loginData } from '../../data/users.data';
import { urlsData } from '../../data/urls.data';
import { Application } from '../pages/application';

// example of page initialiser https://github.com/microsoft/playwright/issues/12176
let APP: Application;

test.describe('Login and My Account pages', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        APP = new Application(page);
        console.log(`Running ${testInfo.title}`);
        await page.goto(urlsData.baseUrl);
    });

    test('Verifies login and My Account pages', async ({ page }) => {
        await expect(page).toHaveScreenshot('login.png', { maxDiffPixels: 50 });

        await APP.loginPage.login(loginData.validUserEmail, loginData.password);
        await APP.loginPage.checkLoginButtonIsNotVisible();

        await page.waitForURL(urlsData.plpUrl);
        await expect(page).toHaveScreenshot('dashboard.png', { maxDiffPixels: 50 });
    });
});