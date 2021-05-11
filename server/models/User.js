const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// generating a hash
UserSchema.methods.validPassword = function (password) {
    return this.password === password;
    // return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateHash = function (value) {
    // this.passwordHash = bcrypt.hashSync(value, 12);
};

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;