'use strict';

var express = require('express');
var Promise = require('bluebird');
var router = express.Router();
var formidable = Promise.promisifyAll(require('formidable'), {multiArgs: true});
var contact = require('../models/contact');

router.get('/', function(req, res) {
  res.render('download-form.twig', req.query);
});

router.post('/form', function(req, res) {

  var form = new formidable.IncomingForm();

  form.parseAsync(req)

  .then(function(result) {

    if (!result[0].email || !result[0].firstName || !result[0].lastName) {
      var msg = 'Please enter your first name, last name, and a valid email.';
      res.redirect('/download?msg=' + msg);
    }

    var email = result[0].email;
    var data = {
      fields: {
        'first name': [{
          value: result[0].firstName,
          modifier: ''
        }],
        'last name': [{
          value: result[0].lastName,
          modifier: ''
        }],
        email: [{
          value: email,
          modifier: 'work'
        }]
      },
      type: 'person'
    };

    // Make sure contact exists and pass to download page.
    return contact.updateByEmail(email, data);

  })

  .then(function(result) {
    console.log('redirect', result);
    res.redirect('/download/alpha?email=' + result.fields.email[0].value);
  })

  .catch(function(error) {
    console.log(error);
  });

});

router.get('/kalabox', function(req, res) {
  var email = req.query.email;
  var extension = req.query.extension;
  var version = 'v' + req.query.version;
  var data = {
    fields: {
      'Latest Version Downloaded': [{
        value: version,
        modifier: ''
      }]
    },
    tags: version
  };
  contact.updateByEmail(email, data).then(function() {
    var githubUrl = 'https://github.com/kalabox/kalabox/releases/download/' +
      version + '/kalabox-' + version + '.' + extension;
    res.redirect(githubUrl);
  });
});

module.exports = router;
