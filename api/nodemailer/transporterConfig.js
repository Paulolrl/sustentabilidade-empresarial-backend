var fs = require('fs');

// TODO: using gmail smtp is bad for prod (https://community.nodemailer.com/using-gmail/)

let rawdata = fs.readFileSync('api/nodemailer/gmailPassword.json');
let gmail = JSON.parse(rawdata);

module.exports = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "sustentabilidade.unicamp@gmail.com",
      pass: gmail.password
    },
    tls: {
      rejectUnauthorized: false
    }
};