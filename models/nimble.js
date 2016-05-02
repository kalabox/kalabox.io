var express = require('express');
var app = express();
var Promise = require("bluebird");
var Nimble = require('node-nimble-api');
var jsonfile = Promise.promisifyAll(require('jsonfile'));
var tokenStore = app.get('env') === 'development' ? 'nimbletoken.json' : '/nimble/nimbletoken.json';

var getNimble = function() {
  var tokens = require('../nimbletoken.json');
  var nimble = Promise.promisifyAll(new Nimble({
    appId: '59fhxr68p7ydnpux2yz35ko7awbx2fv52dzq4',
    appSecret: '6syf4joh6vtpzv013ur',
    accessToken: tokens.accessToken
  }), {multiArgs: true});
  return nimble.doRefreshTokenAsync(tokens.refreshToken).then(function(result) {
    return saveTokens(result[0], result[1]);
  }).then(function() {
    return nimble;
  }).catch(function(error) {
    console.log('getNimble', error);
  });
}

// @todo: remove error and response, add catch statements.
var createContact = function(body) {
  console.log('create');
  return getNimble().then(function(nimble) {
    return nimble.createContactAsync(body);
  }).then(function(result) {
    return result[0];
  }).catch(function(error) {
    return handleNimbleError(error);
  });
}

var findContacts = function(email) {
  return getNimble().then(function(nimble) {
    return nimble.findByEmailAsync(email, true);
  }).then(function(result) {
    return result[0];
  }).catch(function(error) {
    return handleNimbleError(error);
  });
}

var updateContact = function(id, body) {
  return getNimble().then(function(nimble) {
    return nimble.updateContactAsync(id, body);
  }).then(function(result) {
    return result[0];
  }).catch(function(error) {
    return handleNimbleError(error);
  });
}

var handleNimbleError = function(error) {
  if (error.statusCode === '401' && error.data.error === 'invalid_token') {
    return 'Invalid Token.';
  } else {
    return error;
  }
}

var saveTokens = function(accessToken, refreshToken) {
  var tokens = {accessToken: accessToken, refreshToken: refreshToken};
  jsonfile.writeFileAsync(tokenStore, tokens).then(function(error) {
    if (error) {
      return 'Nimble token couldn\t be written';
    } else {
      return 'You are now authenticated! -> ' + tokens;
    }
  });
}

module.exports = {
  getNimble: getNimble,
  createContact: createContact,
  findContacts: findContacts,
  updateContact: updateContact,
  saveTokens: saveTokens
};
