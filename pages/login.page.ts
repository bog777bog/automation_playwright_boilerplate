import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginBtn: Locator;
  private readonly errorText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input#user-name');
    this.passwordInput = page.locator('input#password');
    this.loginBtn = page.locator('#login-button');
    this.errorText = page.locator("[data-test = 'error']");
  }

  async login(email: string, password: string) {
    await this.usernameInput.type(email);
    await this.passwordInput.type(password);
    await this.loginBtn.click();
  }

  async checkLoginButtonIsNotVisible() {
    expect(await this.loginBtn).not.toBeVisible;
  }

  async getErrorMessage() {
    return await this.errorText.textContent();
  }
}
