const { expect } = require('@playwright/test');
const { AsanaPage } = require('./asanaPage');
const exp = require('constants');

const url = 'https://animated-gingersnap-8cf7f2.netlify.app/';
const username = 'admin';
const password = 'password123';

exports.LoginPage = class LoginPage extends AsanaPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
    this.usernameInput = page.locator('id=username');
    this.passwordInput = page.locator('id=password');
    this.signInButton = page.getByRole('button');
  }

  async goto() {
    await this.page.goto(url);
    await expect(this.usernameInput).toBeVisible();
  }

  async logIn() {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    await this.signInButton.click();

    await expect(this.pageTitle).toBeVisible();
  }
};