const sgMail = require('@sendgrid/mail'),
  fs = require('fs');


exports.sendMail = async function (message) {
  let rawdata = fs.readFileSync('sendgridAPIKey.json');
  let key = JSON.parse(rawdata);
  sgMail.setApiKey(key.key)

  await sgMail.send(message);
}