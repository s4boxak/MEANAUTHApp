const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); //encriptacao
const config = require('../config/database');

//user schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//para usar User por fora
const User = module.exports = mongoose.model('User', UserSchema);

//get user por id
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

//get user por username
module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  //gerar salt, key aleatoria para encriptar password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

//comparar password
module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}



