const { test } = require('@playwright/test');
const { registerpage } = require('../pages/registerpage');
const { loginpage } = require('../pages/loginpage');
const { navbar } = require('../pages/navbar');
const d = require('../data/newuser.json');

test(' regeister new user and login', async ({ page }) => {
  const reg = new registerpage(page);
  const login = new loginpage(page);
  const nav = new navbar(page);
  const email = await reg.register(d);
  await login.login(email, d.pass);
  await login.checklogin();
  await nav.checkname(d.first + ' ' + d.last);
});
