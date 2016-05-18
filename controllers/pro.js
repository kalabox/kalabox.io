var express = require('express');
var Promise = require("bluebird");
var router = express.Router();
var _ = require('lodash');
var request = require('request');
var contact = require('../models/contact');
var formidable = Promise.promisifyAll(require("formidable"), {multiArgs: true});

router.get('/', function (req, res) {res.render('kalabox-pro.twig');});

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
    console.log('redirect', result);
    var msg = 'Thanks for your interest in Kalabox Pro.';
    res.redirect('/kalabox-pro?msg=' + msg);
  }).catch(function(error) {
    console.log(error);
  });

});

module.exports = router;