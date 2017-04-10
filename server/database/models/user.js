var db = require('../dbConfig');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

//Change this to something else when authentication in place!!
var currentUser = 99;
var currentEmail = '';
var currentPhone = '';

var Model = db.Model.extend({

  tableName: 'Users',
  hasTimestamps: false,
  initialize: function() {
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      currentUser = this.get('id');
      currentEmail = this.get('email');
      currentPhone = this.get('phone');
      callback(isMatch);
    });
  },
  hashPassword: function() {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
  });

module.exports = {
  Model: Model,
  currentUser: currentUser,
  currentEmail: currentEmail,
  currentPhone: currentPhone
};

// Note to self: Model files are a bookshelf feature to allow us to attach libraries of common tasks used when querying databases