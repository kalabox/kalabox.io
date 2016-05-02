var Twig = require('twig');
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
if (app.get('env') === 'development') {
  port = 8080;
} else {
  app.use( require('express-force-domain')('http://www.kalabox.io') );
}

// Routing.
app.get('/', function (req, res) {res.render('home.twig');});
app.use('/nimble-crm', nimble);
app.use('/download', download);
app.use('/support', support)
app.use('/contact', contact)

// Redirects.
app.get('/download.html', function (req, res) {res.redirect(301, '/download');});
app.get('/alpha-download', function (req, res) {res.redirect(301, '/download/alpha');});
app.get('/alpha-downloads', function (req, res) {res.redirect(301, '/download/alpha');});

app.listen(port);