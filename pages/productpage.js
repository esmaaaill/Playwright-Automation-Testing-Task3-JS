const { expect } = require('@playwright/test');

class productpage {
  constructor(page) {
    this.page = page;
  }

  async checkproduct(name) {
    await expect(this.page.locator('[data-test="product-name"]')).toHaveText(name);
    await expect(this.page.locator('[data-test="unit-price"]')).toBeVisible();
  }

  async addtocart() {
    await this.page.locator('[data-test="add-to-cart"]').click();
  }

  async checkadded(msg) {
    await expect(this.page.getByText(msg)).toBeVisible();
  }
}
module.exports = { productpage };
