const { expect } = require('@playwright/test');

class loginpage {
  constructor(page) {
    this.page = page;
    this.email = page.locator('[data-test="email"]');
    this.pass = page.locator('[data-test="password"]');
    this.btn = page.locator('[data-test="login-submit"]');
  }

  async open() {
    await this.page.goto('/auth/login');
  }

  async login(email, pass) {
    await this.email.fill(email);
    await this.pass.fill(pass);
    await this.btn.click();
  }

  async checklogin() {
    await expect(this.page).toHaveURL(/account/);
    await expect(this.page.getByRole('heading', { name: 'My account' })).toBeVisible();
  }
}
module.exports = { loginpage };
