var fs = require('fs');

// TODO: using gmail smtp is bad for prod (https://community.nodemailer.com/using-gmail/)

let rawdata = fs.readFileSync('api/nodemailer/gmailPassword.json');
let gmail = JSON.parse(rawdata);

module.exports = {
    service: "Gmail",
    auth: {
      user: "sustentabilidade.unicamp@gmail.com",
      pass: gmail.password
    }
};