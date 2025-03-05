import { Page } from '@playwright/test';
import { AccountPage, LoginPage } from '@pages/index';

export class Application {
  public accountPage: AccountPage;
  public loginPage: LoginPage;

  constructor(page: Page) {
    this.accountPage = new AccountPage(page);
    this.loginPage = new LoginPage(page);
  }
}
