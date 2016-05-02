var fs = require('fs');
var nimble = require('./nimble');
var contact = this;

/**
 * Given a user's email, update an existing record with that email if it
 * exists OR create a new record.
 * 
 * @param  string email 
 * @param  json   body  Request details.
 * @return response      
 */
exports.updateByEmail = function(email, body) {
  return contact.find(email).then(function(existingContact) {
    console.log(existingContact);
    if (existingContact) {
      var id = existingContact.id;
      return contact.update(id, body);
    } else {
      return contact.create(body);
    }
  }).catch(function(error) {
    console.log(error);
    return "ERROR" + JSON.stringify(error);
  });
}

exports.create = function(body) {
  return nimble.createContact(body).then(function(result) {
    console.log('This is the new contact \n', result);
    return result;
  }).catch(function(error) {
    console.log(error);
    return "ERROR" + JSON.stringify(error);
  });
}

exports.find = function(email) {
  return nimble.findContacts(email).then(function(result) {
    console.log('These are your contacts \n', result.resources[0].fields);
    return result.resources[0];
  }).catch(function(error) {
    console.log(error);
    return "ERROR" + JSON.stringify(error);
  });
}

exports.update = function(id, body) {
  return nimble.updateContact(id, body).then(function(result) {
    console.log('update', result);
    return result;
  }).catch(function(error) {
    console.log(error);
    return "ERROR" + JSON.stringify(error);
  });
}