const mongoose = require('mongoose');
// const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
//what is it?
const db = require('../db');

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true}
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;