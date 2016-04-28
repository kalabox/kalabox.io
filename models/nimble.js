var Nimble = require('node-nimble-api');
var jsonfile = require('jsonfile');
var nimble = false;
var timer = setInterval(function() {

  var tokens = require('../nimbletoken.json');
  console.log(tokens, nimble);
  return getNimble().doRefreshToken(tokens.refreshToken, function(err, access_token, refresh_token, result) {
    console.log(access_token, refresh_token);
    saveTokens(access_token, refresh_token);
  });
}, 5 * 1000);

var getNimble = function() {
  if (!nimble) {
    var tokens = require('../nimbletoken.json');
    var properties = {
      appId: '59fhxr68p7ydnpux2yz35ko7awbx2fv52dzq4',
      appSecret: '6syf4joh6vtpzv013ur'
    };
    if (tokens.accessToken) {
      properties.accessToken = tokens.accessToken;
    }
    var nimble = new Nimble(properties);
  }
  return nimble;
}

var createContact = function(body) {
  console.log('create');
  return getNimble().createContact(body, handleResponse);
}

var findContacts = function(email) {
  console.log('find');
  return getNimble().findByEmail(email, true, handleResponse);
}

var updateContact = function(id, body) {
  console.log('update');
  return getNimble().updateContact(searchParameters, handleResponse);
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
  console.log(tokens);
  jsonfile.writeFile('nimbletoken.json', tokens, function(error) {
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
