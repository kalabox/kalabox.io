var express = require('express');
var Promise = require("bluebird");
var router = express.Router();
var _ = require('lodash');
var request = require('request');
var contact = require('../models/contact');
var formidable = Promise.promisifyAll(require("formidable"), {multiArgs: true});
var mail = require('../models/mail');

router.get('/', function (req, res) {res.render('kalabox-pro.twig', req.query);});

router.post('/register/form', function (req, res) {
  var form = new formidable.IncomingForm();
  form.parseAsync(req).then(function (result) {
    if (!result[0].email || !result[0].firstName || !result[0].lastName) {
      var msg = 'Please enter your first name, last name, and a valid email.';
      res.redirect('/kalabox-pro?msg=' + msg);
    }
    var email = result[0].email;
    var interval = result[0].interval ? result[0].interval : 'year';
    var request = {
      fields: {
        'first name': [{
          value: result[0].firstName,
          modifier: ""
        }],
        'last name': [{
          value: result[0].lastName,
          modifier: ""
        }],
        email: [{
          value: email,
          modifier: "work"
        }],
        'Pro Frequency': [{
          value: interval,
          modifier: ''
        }]
      },
      "type" : "person"
    };
    // Make sure contact exists and pass to download page.
    return contact.updateByEmail(email, request);
  }).then(function(result) {
    console.log(result);
    var email = result.fields.email[0].value;
    var html = 'Thanks for your interest in Kalabox Pro. We\'re still many months ' +
      'from a release, but rest-assured that when the time comes you will be ' +
      'able to purchase Pro at the discounted pre-sale price.<br><br>In the ' +
      'meantime, let me know if there are other ways the Kalabox team can help ' +
      'make you and your organization more successful. We offer consulting ' +
      'services to improve DevOps workflows, customized containerized ' +
      'infrastructure for your webapps, and welcome sponsorship of new features ' +
      'for the open-source Kalabox project. Perhaps you or someone you know is ' +
      'undertaking a project that could benefit from our expertise? ' +
      '<br><br>Best,<br><br>Alec and the Kalabox Team';
    var mailOptions = {
      from: 'alec@kalabox.io',
      to: email,
      subject: 'You\'ve Reserved Kalabox Pro!',
      text: html,
      html: html
    };
    return mail.sendMail(mailOptions);
  }).then(function() {
    var msg = 'Thanks for your interest in Kalabox Pro.';
    res.redirect('/kalabox-pro?msg=' + msg);
  }).catch(function(error) {
    var msg = 'Something went wrong registering for Kalabox Pro. Please try again.';
    res.redirect('/kalabox-pro?msg=' + msg);
    console.log(error);
  });

});

module.exports = router;