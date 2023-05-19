import { Page } from '@playwright/test';
import { LoginPage } from './login.page';
import { AccountPage } from './account.page';

export class Application {
  public accountPage: AccountPage;
  public loginPage: LoginPage;

  constructor(page: Page) {
    this.accountPage = new AccountPage(page);
    this.loginPage = new LoginPage(page);
  }
}
