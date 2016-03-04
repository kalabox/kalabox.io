var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var request = require('request');

var server = http.createServer(function (req, res) {
  // @todo: parse by download URL as well.
  try {
    if (req.method.toLowerCase() == 'post') {
      processAllFieldsOfTheForm(req, res);
    }
  } catch(err) {
    console.log(err);
  }

});

function processAllFieldsOfTheForm(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    // @todo: does this pass validation?
    var page = '';

    if (/^(?:korobka|eske)-\w{6}$/.test(fields.keycode)) {
      page = fs.readFileSync('alpha-downloads.html');
    } else {
      page = fs.readFileSync('keycode-invalid.html');
    }

    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(page);
  });
}

server.listen(8080, '104.237.158.155');