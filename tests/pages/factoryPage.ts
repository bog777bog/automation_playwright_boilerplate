import { Page } from '@playwright/test';
import { AccountPage } from './account.page';
import { LoginPage } from './login.page';

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
};