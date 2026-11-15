const { expect } = require('@playwright/test');

class checkoutpage {
  constructor(page) {
    this.page = page;
  }

  async checkcart(name, qty) {
    const row = this.page.locator('table tbody tr').filter({ hasText: name });
    await expect(row).toHaveCount(1);
    await expect(row.locator('[data-test="product-quantity"]')).toHaveValue(String(qty));
    await expect(this.page.locator('[data-test="cart-total"]')).toBeVisible();
  }

  async step1() {
    await this.page.locator('[data-test="proceed-1"]').click();
  }

  async step2() {
    await this.page.locator('[data-test="proceed-2"]').click();
  }

  async step3(d) {
    await this.page.locator('[data-test="street"]').fill(d.street);
    await this.page.locator('[data-test="city"]').fill(d.city);
    await this.page.locator('[data-test="state"]').fill(d.state);
    await this.page.locator('[data-test="country"]').selectOption(d.country);
    await this.page.locator('[data-test="postal_code"]').fill(d.postcode);
    await this.page.locator('[data-test="house_number"]').fill(d.house);
    await this.page.locator('[data-test="proceed-3"]').click();
  }

  async pay(msg) {
    await this.page.locator('[data-test="payment-method"]').selectOption({ label: 'Cash on Delivery' });
    await this.page.locator('[data-test="finish"]').click();
    await expect(this.page.getByText(msg)).toBeVisible();
  }

  async finish() {
    await this.page.waitForTimeout(1500);
    await this.page.locator('[data-test="finish"]').click();
    const msg = this.page.getByText(/Your invoice number is/i);
    await expect(msg).toBeVisible();
    const text = await msg.textContent();
    return text.match(/invoice number is\s*[:#]?\s*([A-Za-z0-9-]+)/i)[1];
  }
}
module.exports = { checkoutpage };
