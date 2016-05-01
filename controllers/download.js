var express = require('express');
var Promise = require("bluebird");
var router = express.Router();
var formidable = Promise.promisifyAll(require("formidable"), {multiArgs: true});
var GoogleSpreadsheet = require("google-spreadsheet");
var my_sheet = new GoogleSpreadsheet('10VBH9y5Y8y5jpJmxjny_RQ8IVRyReHlDcIKmT1pDbOk');
var creds = require('../KalaboxKeycodes-ae31acf55c9a.json');
var _ = require('lodash');
var request = require('request');
var release = 'v0.12.0-alpha.3';
var contact = require('../models/contact');

router.get('/', function (req, res) {res.render('download-form.twig');});
router.get('/alpha', downloads);


router.post('/form', function (req, res) {
  var form = new formidable.IncomingForm();
  form.parseAsync(req).then(function (result) {
    console.log(result);
    var email = result[0].email;
    var request = {
      "fields": {
        "first name": [{
          "value": result[0].firstName,
          "modifier": ""
        }],
        "last name": [{
          "value": result[0].lastName,
          "modifier": ""
        }],
        "email": [{
          "value": email,
          "modifier": "work"
        }]
      },
      "type" : "person"
    };
    // Get keycode and pass to /alpha-downloads
    return contact.updateByEmail(email, request);
  }).then(function(result) {
    console.log('contact', result);
    res.redirect('/download/alpha?email=' + email);
  }).catch(function(error) {

  });

});

router.get('/latest', function(req, res) {
  var email = req.query.email;
  var extension = req.query.extension;
  var request = {
    tags: [
      {
        tag: release
      }
    ]
  };
  contact.updateByEmail(email, request).then(function() {
    res.redirect('http://installer.kalabox.io/kalabox-' + release + '.' + os);
  })
});


function downloads(req, res) {
  var page = '';
  var os = '';
  var email = req.query.email;
  if (!_.isEmpty(email)) {
    // Get OS
    var useragent = require('useragent');
    var agent = useragent.lookup(req.headers['user-agent']);
    var os = agent.os.toString();

    page = 'downloads.twig';
  } else {
    page = 'keycode-invalid.twig';
  }

  res.render(page, {
    platform: os,
    release: release,
    email: remail
  });
};

function saveSpreadsheet(keycode) {
  my_sheet.useServiceAccountAuth(creds, function(err){
    my_sheet.getRows(1, {query: 'kalabox = "' + keycode + '"'}, function( err, rows ){
      _.forEach(rows, function(row) {
        row.downloaded = true;
        row.save();
      })
    });
  });
}

function processAllFieldsOfTheForm(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    // Get keycode and pass to /alpha-downloads
    res.redirect('/alpha-downloads?keycode=' + fields.keycode);
  });
}

module.exports = router;