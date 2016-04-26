var express = require('express');
var router = express.Router();
var formidable = require("formidable");
var GoogleSpreadsheet = require("google-spreadsheet");
var my_sheet = new GoogleSpreadsheet('10VBH9y5Y8y5jpJmxjny_RQ8IVRyReHlDcIKmT1pDbOk');
var creds = require('../KalaboxKeycodes-ae31acf55c9a.json');
var _ = require('lodash');
var request = require('request');

router.get('/', function (req, res) {res.render('download.twig');});
router.get('/alpha', downloads);


router.post('/form', function (req, res) {
  // @todo: parse by download URL as well.
  try {
    if (req.method.toLowerCase() == 'post') {
      processAllFieldsOfTheForm(req, res);
    }
  } catch(err) {
    console.log(err);
  }
});


function downloads(req, res) {
  var page = '';
  var os = '';
  var release = '0.12.0-alpha.3';
  if (!_.isEmpty(req.query.keycode) && 
    /^(?:korobka|eske)-\w{6}$/.test(req.query.keycode)) {

    // Get OS
    var useragent = require('useragent');
    var agent = useragent.lookup(req.headers['user-agent']);
    var os = agent.os.toString();

    // Define release
    request.post('https://zapier.com/hooks/catch/1150628/ub5ygg')
      .form({keycode: req.query.keycode, release: release});
    page = 'alpha-downloads.twig';
  } else {
    page = 'keycode-invalid.twig';
  }

  res.render(page, {
    platform: os,
    release: release
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