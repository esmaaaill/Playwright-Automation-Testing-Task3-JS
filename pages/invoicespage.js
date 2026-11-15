const { expect } = require('@playwright/test');

class invoicespage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/account/invoices');
  }

  async checkinvoice(num) {
    await expect(this.page.getByText(num)).toBeVisible();
  }
}
module.exports = { invoicespage };
