const mongoose = require('mongoose');

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
  
const registerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true}, 
    password: { type: String, required: true },
    name: { type: String, required: true },
  });
  
const Register = mongoose.model('Register', registerSchema);

const authenticationSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    authToken: { type: String, required: true, unique: true },
    expiration: { type: Number, required: true }
});
  
const Authentication = mongoose.model('Authentication', authenticationSchema);
  