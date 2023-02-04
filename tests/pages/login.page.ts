import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator
  readonly errorText: Locator

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input#user-name');
    this.passwordInput = page.locator('input#password');
    this.loginBtn = page.locator('#login-button')
    this.errorText = page.locator("[data-test = 'error']")
  }

  async login(email, password) {
    await this.usernameInput.type(email);
    await this.passwordInput.type(password);
    await this.loginBtn.click();
  }

  async checkLoginButtonIsNotVisible(){
    expect(await this.loginBtn).not.toBeVisible;
  }

  async getErrorMessage(){
    console.log('1h1ere1' + await this.errorText.textContent());
    return await this.errorText.textContent();
  }
}