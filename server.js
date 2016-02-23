var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var request = require('request');

var server = http.createServer(function (req, res) {
  if (req.method.toLowerCase() == 'get') {
    displayForm(res);
  } else if (req.method.toLowerCase() == 'post') {
    processAllFieldsOfTheForm(req, res);
  }

});

function displayForm(res) {
  fs.readFile('form.html', function (err, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': data.length
    });
    res.write(data);
    res.end();
  });
}

function processAllFieldsOfTheForm(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
        // Make a request to store new contacts or update old ones in Nimble.
        var contact = {
          "fields": {
            "first name": [{
              "value": fields.firstName,
              "modifier": ""
            }],
            "last name": [{
              "value": fields.lastName,
              "modifier": ""
            }],
            "email": [{
              "value": fields.email,
              "modifier": ""
            }],
            "kalabox code": [{
              "value": fields.code,
              "modifier": ""
            }],
            "lead source": [{
              "value": "Kalabox Mailing List",
              "modifier": ""
            }],
            "lead type": [{
              "value": "Kalabox GUI User",
              "modifier": ""
            }]
          },
          "record_type": "person",
          "tags": "gui alpha"
        };
        
        res.end(util.inspect({
          fields: fields,
          files: files
        }));
      });

}

server.listen(1185);
console.log("server listening on 1185");