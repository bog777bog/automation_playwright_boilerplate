import { Page } from '@playwright/test';
import { AccountPage, LoginPage } from '@pages/index';

export class PageFactory {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getAccountPage() {
    return new AccountPage(this.page);
  }

  getLoginPage() {
    return new LoginPage(this.page);
  }
}
