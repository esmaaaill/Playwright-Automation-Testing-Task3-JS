const { test } = require('@playwright/test');
const { loginpage } = require('../pages/loginpage');
const { homepage } = require('../pages/homepage');
const { productpage } = require('../pages/productpage');
const { checkoutpage } = require('../pages/checkoutpage');
const { navbar } = require('../pages/navbar');
const { makeuser } = require('../pages/helper');
let user;
const p = require('../data/product.json');

test.beforeEach(async ({ page, request }) => {
  user = await makeuser(request);
  const login = new loginpage(page);
  const home = new homepage(page);
  await login.open();
  await login.login(user.email, user.pass);
  await login.checklogin();
  await home.open();
  await home.searchfor(p.name);
  await home.openproduct(p.name);
});

test(' add product to cart', async ({ page }) => {
  const prod = new productpage(page);
  const nav = new navbar(page);
  await prod.checkproduct(p.name);
  await prod.addtocart();
  await prod.checkadded(p.addedmsg);
  await nav.checkbadge(p.qty);
});

test(' check cart', async ({ page }) => {
  const prod = new productpage(page);
  const nav = new navbar(page);
  const checkout = new checkoutpage(page);
  await prod.addtocart();
  await prod.checkadded(p.addedmsg);
  await nav.opencart();
  await checkout.checkcart(p.name, p.qty);
});
