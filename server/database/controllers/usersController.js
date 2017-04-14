const db = require('../dbConfig');
const Users = require('../collections/users');
const User = require('../models/user');

const getByID = function(id) {
  console.log('get by ID ', id);
  return db.knex('Users')
    .where({ id: id })
    .then(function(id){
      console.log(id)
      return id;
    })
    .catch(function(err){
      console.error(err)
    });
};

const findByEmail = function(email) {
  console.log('find one by email', email);
  return db.knex('Users')
    .where({ email: email })
    .then(function(email) {
      console.log(email)
      return email;
    })
    .catch(function(err) {
      console.error(err)
    });
};


const addUser = function(email,password,firstName,lastName,phone,voicePref,avatar) {
  console.log('adding ' + email + ' and ' + password);
  return db.knex('Users')
    .insert(
    {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      voice_pref: voicePref,
      avatar: avatar,
    }
  )
  .catch(function(err) {
    console.error(err)
  });
  // .then(callback);
  // .catch(function(err) {
  //   console.error(err)
  // });
  console.log('added user! ' + email);
};

module.exports= {
  getByID,
  findByEmail,
  addUser
};
