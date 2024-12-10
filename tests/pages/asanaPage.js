const { expect } = require('@playwright/test');

exports.AsanaPage = class AsanaPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.pageTitle = page.locator('h1:nth-child(1)');

    // this.leftNavWebApp = page.locator('button', { hasText: 'Web Application' });
    this.leftNavWebApp = page.locator('button', { hasText: 'Web Application'});
    this.leftNavMobileApp = page.locator('button', { hasText: 'Mobile Application' });
    this.leftNavMarketing = page.locator('button', { hasText: 'Marketing' });

    this.toDoColumn = page.locator('main > div > div > div:nth-child(1)');
    this.inProgressColumn = page.locator('main > div > div > div:nth-child(2)');
    this.reviewColumn = page.locator('main > div > div > div:nth-child(3)');
    this.doneColumn = page.locator('main > div > div > div:nth-child(4)');

    this.toDoCards = page.locator('main > div > div > div:nth-child(1) > div');
    this.inProgressCards = page.locator('main > div > div > div:nth-child(2) > div');
    this.reviewCards = page.locator('main > div > div > div:nth-child(3) > div');
    this.doneCards = page.locator('main > div > div > div:nth-child(4) > div');
  }

  async goToWebApp(){
    await this.leftNavWebApp.click();
    await expect (this.pageTitle).toHaveText('Web Application');
  }

  async goToMobileApp(){
    await this.leftNavMobileApp.click();
    await expect (this.pageTitle).toHaveText('Mobile Application')
  };

  async goToMarketing(){
    await this.leftNavMarketing.click();
    await expect (this.pageTitle).toHaveText('Marketing Campaign')
  };
};