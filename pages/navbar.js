const { expect } = require('@playwright/test');

class navbar {
  constructor(page) {
    this.page = page;
    this.cart = page.locator('[data-test="nav-cart"]');
    this.menu = page.locator('[data-test="nav-menu"]');
  }

  async checkname(name) {
    await expect(this.menu).toContainText(name);
  }

  async checkbadge(num) {
    await expect(this.cart).toContainText(String(num));
  }

  async opencart() {
    await this.cart.click();
  }
}
module.exports = { navbar };
