const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

/*
____________________ Database Schemas _________________________ 
---------------------------------------------------------------
    > This file is mainly to keep our database structure organized and easily referenced
    > Add any new database Schemas here, and then reference them from server.js
*/


const loginSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    salt: { type: String, required: true },
  });
  
const Login = mongoose.model('Login', loginSchema);
  
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true}, 
    password: { type: String, required: true },
    name: { type: String, required: true },
  });
  

userSchema.methods.generateHash = function(password) {
    console.log(password)
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
