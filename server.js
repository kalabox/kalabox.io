'use strict';

var _ = require('lodash');
var express = require('express');
var app = express();
var path = require('path');
var nimble = require('./controllers/nimble');
var download = require('./controllers/download');
var support = require('./controllers/support');
var contact = require('./controllers/contact');
var port = 80;

// App configuration.
app.set('view engine', 'twig');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));

// Do platform things
if (!_.isEmpty(process.env.PLATFORM_ENVIRONMENT)) {

  // Get platform config
  var config = require('platformsh').config();

  // Set port
  port = config.port;

  // Load in platform vars
  if (!_.isEmpty(config.variables)) {
    _.forEach(require('platformsh').config().variables, function(value, key) {
      process.env[key] = value;
    });
  }

  // Force app usages
  if (config.branch === 'master') {
    app.use(require('express-force-domain')('http://www.kalabox.io'));
  }

}

// Load in .env if applicable
// This will not replace current process.env if set eg you wont have to use this on Platform
require('dotenv').config();

// Routing.
app.get('/', function(req, res) {
  req = req;
  res.render('home.twig');
});
app.use('/nimble-crm', nimble);
app.use('/download', download);
app.use('/support', support);
app.use('/contact', contact);

// Redirects.
app.get('/download.html', function(req, res) {
  req = req;
  res.redirect(301, '/download');
});
app.get('/alpha-download', function(req, res) {
  req = req;
  res.redirect(301, '/download');
});
app.get('/alpha-downloads', function(req, res) {
  req = req;
  res.redirect(301, '/download');
});

app.listen(port);
