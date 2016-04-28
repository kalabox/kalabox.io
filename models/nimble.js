var Promise = require("bluebird");
var Nimble = require('node-nimble-api');
var tokens = require('../nimbletoken.json');
var nimble = Promise.promisifyAll(new Nimble({
  appId: '59fhxr68p7ydnpux2yz35ko7awbx2fv52dzq4',
  appSecret: '6syf4joh6vtpzv013ur',
  accessToken: tokens.accessToken
}));
var jsonfile = Promise.promisifyAll(require('jsonfile'));


var getNimble = function() {
  return nimble.doRefreshTokenAsync(tokens.refreshToken).then(function(access_token, refresh_token, result) {
    console.log('access_token', access_token);
    return saveTokens(access_token, refresh_token);
  }).then(function(){
    return nimble;
  });
}

var createContact = function(body) {
  console.log('create');
  return getNimble().then(function(nimble) {
    return nimble.createContactAsync(body);
  }).then(function(error, result, response) {
    return handleResponse(error, result, response);
  });
}

var findContacts = function(email) {
  console.log('find');
  return getNimble().then(function(nimble) {
    console.log('find1', nimble);
    return nimble.findByEmailAsync(email, true);
  }).then(function(error, result, response) {
    console.log('find2', result);
    return handleResponse(error, result, response);
  });
}

var updateContact = function(id, body) {
  console.log('update');
  return getNimble().then(function(nimble) {
    return nimble.updateContactAsync(searchParameters);
  }).then(function(error, result, response) {
    return handleResponse(error, result, response);
  });
}

var handleResponse = function(error, result, response) {
  if (error) {
    if (error.statusCode === '401' && error.data.error === 'invalid_token') {
      return 'Invalid Token.';
    } else {
      return error;
    }
  } else {
    return result;
  }
}

var saveTokens = function(accessToken, refreshToken) {
  var tokens = {accessToken: accessToken, refreshToken: refreshToken};
  jsonfile.writeFileAsync('nimbletoken.json', tokens).then(function(error) {
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
