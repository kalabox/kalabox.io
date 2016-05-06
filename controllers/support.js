var express = require('express');
var router = express.Router();
var formidable = require("formidable");
var nodemailer = require('nodemailer');

router.get('/', function (req, res) {res.render('support.twig', req.query);});
router.get('/professional', function (req, res) {res.render('professional-support.twig', req.query);});
router.post('/email', emailSubmission);

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

module.exports = router;