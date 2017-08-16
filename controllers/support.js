'use strict';

var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var mail = require('../models/mail');

var emailSubmission = function(req, res) {
  var form = new formidable.IncomingForm();
  var sender = '';
  var name = '';
  var msg = 'There was an issue processing your email request.' +
    ' Please try again.';

  form.parse(req, function(err, fields) {

    if (err) {
      throw new Error(err);
    }

    sender = fields.email;
    name = fields.name;

    if (sender) {

      var mailOptions = {
        from: sender,
        to: 'alec@kalabox.io',
        subject: 'Support Signup Request',
        text: name + ' is interested in Kalabox!',
        html: '<b>test message form mailgun</b>'
      };

      mail.sendMail(mailOptions)

      .then(function() {
        msg = 'Email sent successfully.';
        res.redirect('/support/professional?msg=' + msg);
      })

      .catch(function(error) {
        console.log(error);
      });
    }

    // Else
    else {
      res.redirect('/support/professional?msg=Enter your name and email.');
    }
  });
};

router.get('/', function(req, res) {
  res.render('support.twig',
  req.query);
});
router.get('/professional', function(req, res) {
  req = req;
  res.redirect(301, '/support');
});
router.post('/email', emailSubmission);

module.exports = router;
