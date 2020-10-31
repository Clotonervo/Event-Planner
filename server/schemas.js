const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/*
____________________ Database Schemas _________________________
---------------------------------------------------------------
    > This file is mainly to keep our database structure organized and easily referenced
    > Add any new database Schemas here, and then reference them from server.js
*/

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    name: { type: String, required: true },
  });

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

const authenticationSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    authToken: { type: String, required: true, unique: true },
    expiration: { type: Number, required: true }
});

const Authentication = mongoose.model('Authentication', authenticationSchema);

const eventSchema = new mongoose.Schema({
    eventID: { type: String, required: true, unique: true},
    eventName: { type: String, required: true},
    location: { { address: String } },
    collaborators: [{ username: String, name: String }],
    viewers: [{ username: String, name: String }],
    date: { type: Date},
    past: { type: Boolean },
    description: { type: String },
    color: { type: String, default: '#FFFFFF' }
});

eventSchema.methods.createEventID = function() {
      return uuidv4().substring(0, 8)
};

const Event = mongoose.model('Event', eventSchema);

const userToEvents = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    events: [{ type: String }]
});

const UserToEvents = mongoose.model('UserToEvents', userToEvents);
