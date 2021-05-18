const mongoose = require('mongoose');
const { response } = require('express');

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true},
    password: {type: String, required: true}
});
 
const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;