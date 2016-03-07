var Twig = require('twig');
var express = require('express');
var app = express();
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var path = require('path');
var request = require('request');
var GoogleSpreadsheet = require("google-spreadsheet");
var my_sheet = new GoogleSpreadsheet('1qzFyijCriIZcHqk-JuMg2lxL4fyMLRZybBPPZq2ECuM');
var creds = require('./KalaboxKeycodes-ae31acf55c9a.json');
var _ = require('lodash');

// App configuration
app.set('view engine', 'twig');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));

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
app.get('/download.html', function (req, res) {res.render('download.twig');});
app.get('/alpha-downloads', downloads);

function downloads(req, res) {
  var page = '';
  if (!_.isEmpty(req.query.keycode) && /^(?:korobka|eske)-\w{6}$/.test(req.query.keycode)) {
    page = 'alpha-downloads.twig';
    saveSpreadsheet(req.query.keycode);
  } else {
    page = 'keycode-invalid.twig';
  }

  res.render(page, {
    platform: 'Mac'
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

app.listen(8080);