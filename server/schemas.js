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
    location: { type: String },
    collaborators: [{ type: String }],
    viewers: [{ type: String }],
    past: { type: Boolean }
});

eventSchema.methods.createEventID = function() {
      return uuidv4().substring(0, 8)
};

const Event = mongoose.model('Event', eventSchema);

const userToEvents = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    events: [{ type: String }]
});

const rsvpSchema = new mongoose.Schema({
    eventID: { type: String, required: true},
    username: { type: String, required: true},
    attending: { type: String, enum: ['yes', 'no', 'maybe', 'pending']}
});

const RSVP = mongoose.model('RSVP', rsvpSchema);

rsvpSchema.index({eventID:1, username:1}, { unique: true });
