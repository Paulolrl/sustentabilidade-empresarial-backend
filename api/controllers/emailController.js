var nodemailer = require('nodemailer'),
    transporterConfig = require('../nodemailer/transporterConfig');

exports.sendMail = async function (message) {
    const transporter = nodemailer.createTransport(transporterConfig);
    await transporter.sendMail(message);
}