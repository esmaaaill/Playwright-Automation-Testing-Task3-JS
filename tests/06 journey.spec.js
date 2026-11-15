const { test } = require('@playwright/test');
const { loginpage } = require('../pages/loginpage');
const { homepage } = require('../pages/homepage');
const { productpage } = require('../pages/productpage');
const { checkoutpage } = require('../pages/checkoutpage');
const { navbar } = require('../pages/navbar');
const { makeuser } = require('../pages/helper');
let user;
const p = require('../data/product.json');
const addr = require('../data/newuser.json');

test(' full buy journeyyy', async ({ page, request }) => {
  user = await makeuser(request);
  const login = new loginpage(page);
  const home = new homepage(page);
  const prod = new productpage(page);
  const checkout = new checkoutpage(page);
  const nav = new navbar(page);

  await test.step('login', async () => {
    await login.open();
    await login.login(user.email, user.pass);
    await login.checklogin();
  });
  await test.step('search', async () => {
    await home.open();
    await home.searchfor(p.name);
    await home.checksearch(p.name);
  });
  await test.step('open product', async () => {
    await home.openproduct(p.name);
    await prod.checkproduct(p.name);
  });
  await test.step('add to cart', async () => {
    await prod.addtocart();
    await prod.checkadded(p.addedmsg);
    await nav.checkbadge(p.qty);
  });
  await test.step('cart', async () => {
    await nav.opencart();
    await checkout.checkcart(p.name, p.qty);
  });
  await test.step('checkout', async () => {
    await checkout.step1();
    await checkout.step2();
    await checkout.step3(addr);
  });
  await test.step('payment', async () => {
    await checkout.pay(p.paymsg);
    await checkout.finish();
  });
});
