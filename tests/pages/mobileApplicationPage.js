const { expect } = require('@playwright/test');
const { AsanaPage } = require('./asanaPage');

exports.MobileApplicationPage = class MobileApplicationPage extends AsanaPage{

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
    this.passwordInput = page.locator('input', { id: 'password' });

  }
};