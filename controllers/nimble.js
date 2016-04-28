var express = require('express');
var router = express.Router();
var nimble = require('../models/nimble');

router.get('/authorization', function(req, res) {
  var redirectURI = 'http://www.kalabox.io/nimble-crm/authorized';
  res.redirect(nimble.api.getAuthorizationUrl({redirect_uri: redirectURI}));
});


// You must make sure that the wrapper is using for requesting the access token the SAME
// redirect_uri provided for getAuthorizationUrl, either by using the same wrapper or by
// providing the redirect_uri in the wrapper constructor if you are using a new object for requestToken.

router.get('/authorized', function(req, res) {
  if(!req.query.error) {
    nimble.api.requestToken(req.query.code, function(err, access_token, refresh_token, result) {
      var result = nimble.saveTokens(access_token, refresh_token);
      res.send(result);
    });
  } else {
    res.send('Error authenticating!!! -> ' + err);
  }
});

module.exports = router;