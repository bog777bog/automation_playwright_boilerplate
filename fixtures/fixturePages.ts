import { AccountPage }from '../tests/pages/account.page';
import { LoginPage } from '../tests/pages/login.page';
import { test as base } from './fixturesBase';
import { Page } from '@playwright/test';

type Pages = {
  loginPage: LoginPage,
  accountPage: AccountPage
};

export const test = base.extend<Pages>({
  loginPage: async ({page}, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  accountPage: async ({page}, use) => {
    const accountPage = new AccountPage(page);
    await use(accountPage);
  }
});