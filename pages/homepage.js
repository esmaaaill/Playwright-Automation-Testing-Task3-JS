const { expect } = require('@playwright/test');

class homepage {
  constructor(page) {
    this.page = page;
    this.search = page.locator('[data-test="search-query"]');
    this.searchbtn = page.locator('[data-test="search-submit"]');
    this.names = page.locator('[data-test="product-name"]');
  }

  async open() {
    await this.page.goto('/');
  }

  async searchfor(name) {
    await this.search.fill(name);
    await this.searchbtn.click();
  }

  async checksearch(name) {
    await expect(this.page.getByText('Searched for: ' + name)).toBeVisible();
    await expect(this.names.first()).toContainText(name);
  }

  async openproduct(name) {
    await this.names.filter({ hasText: name }).first().click();
  }
}
module.exports = { homepage };
