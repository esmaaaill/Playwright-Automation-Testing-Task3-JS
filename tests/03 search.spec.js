const { test } = require('@playwright/test');
const { loginpage } = require('../pages/loginpage');
const { homepage } = require('../pages/homepage');
const { makeuser } = require('../pages/helper');
let user;
const p = require('../data/product.json');

test.beforeEach(async ({ page, request }) => {
  user = await makeuser(request);
  const login = new loginpage(page);
  await login.open();
  await login.login(user.email, user.pass);
  await login.checklogin();
});

test(' search for thor hammer', async ({ page }) => {
  const home = new homepage(page);
  await home.open();
  await home.searchfor(p.name);
  await home.checksearch(p.name);
});
