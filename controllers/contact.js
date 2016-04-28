var fs = require('fs');
var express = require('express');
var router = express.Router();
var contact = require('../models/contact');
var bodyParser = require('body-parser')

router.use(bodyParser.json());

router.post('/', function(req, res) {
  var body = req.body;
  var email = body.fields.email[0].value;
  console.log(body, email);
  contact.updateByEmail(email, body);
});

module.exports = router;