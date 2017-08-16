'use strict';

var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var Nimble = require('node-nimble-api');
var nimbleModel = require('../models/nimble');
var redirectUri = 'http://www.kalabox.io/nimble-crm/authorized';

var getNimble = function() {
  return Promise.promisifyAll(new Nimble({
    appId: process.env.NIMBLE_KEY,
    appSecret: process.env.NIMBLE_SECRET,
    'redirect_uri': redirectUri
  }, {multiArgs: true}));
};

router.get('/authorization', function(req, res) {
  req = req;
  res.redirect(getNimble().getAuthorizationUrl({'redirect_uri': redirectUri}));
});

// You must make sure that the wrapper is using for requesting the access token the SAME
// redirect_uri provided for getAuthorizationUrl, either by using the same wrapper or by
// providing the redirect_uri in the wrapper constructor if you are using a new object for requestToken.

router.get('/authorized', function(req, res) {
  if (!req.query.error) {

    getNimble().requestTokenAsync(req.query.code)

    .then(function(result) {
      console.log('requestToken', result);
      return nimbleModel.saveTokens(result, null);
    })

    .then(function(result) {
      console.log('save token', result);
      res.send(result);
    })

    .catch(function(error) {
      console.log(error);
      res.send('Error authenticating!!! -> ' + error);
    });

  }
});

router.get('/refresh', function(req, res) {
  req = req;
  res.send(nimbleModel.getNimble());
});

module.exports = router;
