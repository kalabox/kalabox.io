'use strict';

var Promise = require('bluebird');
var nodemailer = require('nodemailer');

var sendMail = function(mailOptions) {

  var transporter = Promise.promisifyAll(nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_PASSWORD
    }
  });

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendMail: sendMail
};
