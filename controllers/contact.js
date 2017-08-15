'use strict';

var express = require('express');
var router = express.Router();
var contact = require('../models/contact');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/', function(req, res) {
  var body = req.body;
  var email = body.email.value;
  console.log(body, email);
  contact.updateByEmail(email, body).then(function(result) {
    res.redirect('/download/alpha?keycode=' + result.keycode);
  });
});

router.post('/download', function(req, res) {
  var id = req.body.id;
  var version = req.body.version;
  contact.registerDownload(id, version).then(function() {
    res.redirect('http://installer.kalabox.io/kalabox-' + version);
  });
});

module.exports = router;
