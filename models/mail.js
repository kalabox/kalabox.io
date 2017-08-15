'use strict';

var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASSWORD
  }
});
transporter = Promise.promisifyAll(transporter);

var sendMail = function(mailOptions) {
  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendMail: sendMail
};
