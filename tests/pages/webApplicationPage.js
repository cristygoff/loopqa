const { expect } = require('@playwright/test');
const { AsanaPage } = require('./asanaPage');

exports.WebApplicationPage = class WebApplicationPage extends AsanaPage{

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
    this.usernameInput = page.locator('input', { id: 'username' });
  }

  async goto() {
    await this.page.goto(url);
    await expect(this.usernameInput()).toBeVisible();
  }

  async logIn(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

};