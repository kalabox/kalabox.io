'use strict';

var express = require('express');
var app = express();
var Promise = require('bluebird');
var Nimble = require('node-nimble-api');
var jsonfile = Promise.promisifyAll(require('jsonfile'));
var tokenStore = '/app/nimble/nimbletoken.json';

var handleNimbleError = function(error) {
  if (error.statusCode === '401' && error.data.error === 'invalid_token') {
    console.log('Invalid Token');
    return 'Invalid Token.';
  }

  // Else
  else {
    console.log(error);
    return error;
  }
};

var saveTokens = function(accessToken, refreshToken) {

  var tokens = {accessToken: accessToken, refreshToken: refreshToken};

  console.log(tokenStore, tokens);

  return jsonfile.writeFileAsync(tokenStore, tokens)

  .then(function() {
    return 'You are now authenticated! -> ' + tokens;
  })

  .catch(function(error) {
    console.log(error);
    return 'Nimble token couldn\'t be written';
  });

};

var getNimble = function() {

  console.log(app.get('env'));

  var tokens = require(tokenStore);
  var nimble = '';

  try {
    nimble = Promise.promisifyAll(new Nimble({
      appId: process.env.NIMBLE_KEY,
      appSecret: process.env.NIMBLE_SECRET,
      accessToken: tokens.accessToken
    }), {multiArgs: true});
  }
  catch (error) {
    console.log(error);
    return error;
  }

  return nimble.doRefreshTokenAsync(tokens.refreshToken)

  .then(function(result) {
    return saveTokens(result);
  })

  .then(function() {
    return nimble;
  })

  .catch(function(error) {
    console.log(error);
    return error;
  });

};

var createContact = function(body) {

  console.log('create');

  return getNimble()

  .then(function(nimble) {
    return nimble.createContactAsync(body);
  })

  .then(function(result) {
    return result[0];
  })

  .catch(function(error) {
    return handleNimbleError(error);
  });

};

var findContacts = function(email) {

  console.log('findContacts', email);

  return getNimble()

  .then(function(nimble) {
    console.log('nimble', nimble);
    return nimble.findByEmailAsync(email, true);
  })

  .then(function(result) {
    console.log('findContacts', result);
    return result[0];
  })

  .catch(function(error) {
    return handleNimbleError(error);
  });
};

var updateContact = function(id, body) {

  return getNimble().then(function(nimble) {
    return nimble.updateContactAsync(id, body);
  })

  .then(function(result) {
    return result[0];
  })

  .catch(function(error) {
    return handleNimbleError(error);
  });

};

module.exports = {
  getNimble: getNimble,
  createContact: createContact,
  findContacts: findContacts,
  updateContact: updateContact,
  saveTokens: saveTokens
};
