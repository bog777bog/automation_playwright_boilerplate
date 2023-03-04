import { expect, Locator, Page } from '@playwright/test';
import { urlsData } from '../../data/urls.data'; 

export class AccountPage {
  readonly page: Page;
  readonly burgerMenuBtn: Locator;
  readonly logooutBtn: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly resetAppStateLink: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.burgerMenuBtn = page.locator('#react-burger-menu-btn');
    this.logooutBtn = page.locator('#logout_sidebar_link');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
  }

  async clickOnMenuItem(item: string) {
    await this.burgerMenuBtn.click();
    switch(item) { 
      case 'Logout': { 
         await this.logooutBtn.click();
         break; 
      } 
      case 'All items': { 
        await this.allItemsLink.click();
        break; 
      } 
      case 'About': { 
        await this.aboutLink.click();
        break; 
      } 
      case 'Reset App State': { 
        await this.resetAppStateLink.click();
        break; 
      } 
      default: { 
        console.log('There is not such item to click');
        break; 
      } 
   } 
  }

  async logOutFromAccount(){
    await this.clickOnMenuItem('Logout');
    await this.page.waitForURL(urlsData.baseUrl);
  }
}