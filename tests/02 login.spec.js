const { test } = require('@playwright/test');
const { loginpage } = require('../pages/loginpage');
const { navbar } = require('../pages/navbar');
const { makeuser } = require('../pages/helper');
let user;

test('login with valid user', async ({ page, request }) => {
  user = await makeuser(request);
  const login = new loginpage(page);
  const nav = new navbar(page);
  await login.open();
  await login.login(user.email, user.pass);
  await login.checklogin();
  await nav.checkname(user.name);
});
