'use strict';

var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: 'postmaster@mg.kalabox.io',
    pass: 'f2c2273097eada5c3875966b2d89ea99'
  }
});
transporter = Promise.promisifyAll(transporter);

var sendMail = function(mailOptions) {
  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendMail: sendMail
};
