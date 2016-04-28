var express = require('express');
var app = express();
var fs = require('fs');
var nimble = require('./nimble');

/**
 * Given a user's email, update an existing record with that email if it
 * exists OR create a new record.
 * 
 * @param  string email 
 * @param  json   body  Request details.
 * @return response      
 */
exports.updateByEmail = function(email, body) {
  this.find(email, function(result) {
    var existingContacts = result.resources;
    if (existingContacts) {
      console.log('existing', existingContacts);
      var id = existingContacts[0].id;
      return this.update(id, body);
    } else {
      return this.create(body);
    }
  });
}

exports.create = function(body) {
  return nimble.createContact(body, function(error, result, response) {
    if (error) {
      console.log(error);
      return "ERROR" + JSON.stringify(error);
    } else {
      console.log(result);
      return result;
    }
  });
}

exports.find = function(email, callback) {
  return nimble.findContacts(email, function(error, result, response) {
    if (error) {
      console.log(error);
      return callback("ERROR" + JSON.stringify(error));
    } else {
      console.log('These are your contacts \n', result.resources);
      return callback(result);
    }
  });
}

exports.update = function(id, body) {
  return nimble.updateContact(id, body, function(error, result, response) {
    if (error) {
      console.log(error);
      return "ERROR" + JSON.stringify(error);
    } else {
      console.log(result);
      return result;
    }
  });
}