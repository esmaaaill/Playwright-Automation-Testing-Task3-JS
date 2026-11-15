const d = require('../data/newuser.json');

async function makeuser(request) {
  const email = 'esmail' + Date.now() + Math.floor(Math.random() * 1000) + '@test.com';
  const res = await request.post('https://api.practicesoftwaretesting.com/users/register', {
    data: {
      first_name: d.first,
      last_name: d.last,
      dob: d.dob,
      phone: d.phone,
      email: email,
      password: d.pass,
      address: {
        street: d.street,
        city: d.city,
        state: d.state,
        country: d.country,
        postal_code: d.postcode,
      },
    },
  });
  if (!res.ok()) {
    throw new Error('register api failed ' + res.status() + ' ' + (await res.text()));
  }
  return { email: email, pass: d.pass, name: d.first + ' ' + d.last };
}
module.exports = { makeuser };
