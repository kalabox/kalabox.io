var Twig = require('twig');
var express = require('express');
var app = express();
var fs = require('fs');
var formidable = require("formidable");
var nodemailer = require('nodemailer');
var util = require('util');
var path = require('path');
var request = require('request');
var GoogleSpreadsheet = require("google-spreadsheet");
var my_sheet = new GoogleSpreadsheet('10VBH9y5Y8y5jpJmxjny_RQ8IVRyReHlDcIKmT1pDbOk');
var creds = require('./KalaboxKeycodes-ae31acf55c9a.json');
var _ = require('lodash');

// App configuration
app.set('view engine', 'twig');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));
app.use( require('express-force-domain')('http://www.kalabox.io') );

app.post('/form', function (req, res) {
  // @todo: parse by download URL as well.
  try {
    if (req.method.toLowerCase() == 'post') {
      processAllFieldsOfTheForm(req, res);
    }
  } catch(err) {
    console.log(err);
  }
});

app.get('/', function (req, res) {res.render('home.twig');});
app.get('/support', function (req, res) {res.render('support.twig', req.query);});
app.get('/download.html', function (req, res) {res.render('download.twig');});
app.get('/alpha-downloads', downloads);
app.get('/alpha-download', downloads);
app.post('/support/email', emailSubmission);

function emailSubmission(req, res) {
  var form = new formidable.IncomingForm();
  var sender = '';
  var name = '';
  var msg = 'There was an issue processing your email request. Please try again.';

  form.parse(req, function (err, fields, files) {
    sender = fields.email;
    name = fields.name;
    if (sender) {
      var transporter = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
            user: 'postmaster@mg.kalabox.io',
            pass: 'f2c2273097eada5c3875966b2d89ea99'
        }
      });

      var mailOptions = {
        from: sender,
        to: 'alec@kalabox.io',
        subject: 'Support Signup Request',
        text: name + ' is interested in Kalabox!',
        html : '<b>test message form mailgun</b>'
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          msg = 'Email sent successfully.';
        };
        res.redirect('/support?msg=' + msg);
      });
    } else {
      res.redirect('/support?msg=Enter your name and email.');
    }
  });
}

function downloads(req, res) {
  var page = '';
  var os = '';
  if (!_.isEmpty(req.query.keycode) && /^(?:korobka|eske)-\w{6}$/.test(req.query.keycode)) {
    var useragent = require('useragent');
    var agent = useragent.lookup(req.headers['user-agent']);
    var os = agent.os.toString();
    page = 'alpha-downloads.twig';
    saveSpreadsheet(req.query.keycode);
  } else {
    page = 'keycode-invalid.twig';
  }

  res.render(page, {
    platform: os
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

app.listen(80);