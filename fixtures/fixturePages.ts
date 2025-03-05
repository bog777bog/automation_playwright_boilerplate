import { Application, AccountPage, LoginPage }from '@pages/index';
import { test as base } from './fixturesBase';

type Pages = {
  loginPage: LoginPage,
  accountPage: AccountPage
  APP: Application
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  accountPage: async ({ page }, use) => {
    const accountPage = new AccountPage(page);
    await use(accountPage);
  },
  APP: async ({ page }, use) => {
   const APP = new Application(page);
   await use(APP);
  }
});