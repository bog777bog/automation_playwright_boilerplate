import { LoginPage, AccountPage  } from '@pages/index';
import { ConsoleMessage, Page, test as base } from "@playwright/test";
import { userData } from '@data/login.data';

export const authenticated = base.extend({
    authenticatedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(userData['validUser'].email, userData['validUser'].password);
        await loginPage.checkLoginButtonIsNotVisible();
        await use(new AccountPage(page));
    }
}); 