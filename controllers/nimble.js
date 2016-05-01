var express = require('express');
var router = express.Router();
var Nimble = require('node-nimble-api');
var nimble = new Nimble({
  appId: '59fhxr68p7ydnpux2yz35ko7awbx2fv52dzq4',
  appSecret: '6syf4joh6vtpzv013ur'
});
var nimbleModel = require('../models/nimble');

router.get('/authorization', function(req, res) {
  var redirectURI = 'http://www.kalabox.io/nimble-crm/authorized';
  res.redirect(nimble.getAuthorizationUrl({redirect_uri: redirectURI}));
});


// You must make sure that the wrapper is using for requesting the access token the SAME
// redirect_uri provided for getAuthorizationUrl, either by using the same wrapper or by
// providing the redirect_uri in the wrapper constructor if you are using a new object for requestToken.

router.get('/authorized', function(req, res) {
  if(!req.query.error) {
    nimble.requestToken(req.query.code, function(err, access_token, refresh_token, result) {
      var result = nimbleModel.saveTokens(access_token, refresh_token);
      res.send(result);
    });
  } else {
    res.send('Error authenticating!!! -> ' + err);
  }
});

router.get('/refresh', function(req, res) {
  res.send(nimbleModel.getNimble());
});

module.exports = router;