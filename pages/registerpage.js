const { expect } = require('@playwright/test');

class registerpage {
  constructor(page) {
    this.page = page;
  }

  async register(d) {
    const email = 'esmail' + Date.now() + '@test.com';
    await this.page.goto('/auth/register');
    await this.page.locator('[data-test="first-name"]').fill(d.first);
    await this.page.locator('[data-test="last-name"]').fill(d.last);
    await this.page.locator('[data-test="dob"]').fill(d.dob);
    await this.page.locator('[data-test="street"]').fill(d.street);
    await this.page.locator('[data-test="postal_code"]').fill(d.postcode);
    await this.page.locator('[data-test="house_number"]').fill(d.house);
    await this.page.locator('[data-test="city"]').fill(d.city);
    await this.page.locator('[data-test="state"]').fill(d.state);
    await this.page.locator('[data-test="country"]').selectOption(d.country);
    await this.page.locator('[data-test="phone"]').fill(d.phone);
    await this.page.locator('[data-test="email"]').fill(email);
    await this.page.locator('[data-test="password"]').fill(d.pass);
    await this.page.locator('[data-test="register-submit"]').click();
    await expect(this.page).toHaveURL(/login/);
    return email;
  }
}
module.exports = { registerpage };
