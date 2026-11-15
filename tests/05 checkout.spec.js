const { test } = require('@playwright/test');
const { loginpage } = require('../pages/loginpage');
const { homepage } = require('../pages/homepage');
const { productpage } = require('../pages/productpage');
const { checkoutpage } = require('../pages/checkoutpage');
const { invoicespage } = require('../pages/invoicespage');
const { navbar } = require('../pages/navbar');
const { makeuser } = require('../pages/helper');
let user;
const p = require('../data/product.json');
const addr = require('../data/newuser.json');

test.beforeEach(async ({ page, request }) => {
  user = await makeuser(request);
  const login = new loginpage(page);
  const home = new homepage(page);
  const prod = new productpage(page);
  const nav = new navbar(page);
  await login.open();
  await login.login(user.email, user.pass);
  await login.checklogin();
  await home.open();
  await home.searchfor(p.name);
  await home.openproduct(p.name);
  await prod.addtocart();
  await prod.checkadded(p.addedmsg);
  await nav.opencart();
});

test(' checkout and check invoice', async ({ page }) => {
  const checkout = new checkoutpage(page);
  const inv = new invoicespage(page);
  await checkout.step1();
  await checkout.step2();
  await checkout.step3(addr);
  await checkout.pay(p.paymsg);
  const num = await checkout.finish();
  await inv.open();
  await inv.checkinvoice(num);
});
