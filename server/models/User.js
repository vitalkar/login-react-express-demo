const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// UserSchema.plugin(passportLocalMongoose);

// generating a hash
// userSchema.methods.generateHash = function (password) {
//     // return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// checks if password is valid
// userSchema.methods.validPassword = function (password) {
//     // return bcrypt.compareSync(password, this.local.password);
// };


const User = mongoose.model('User', UserSchema, 'users');


// To use with sessions
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

module.exports = User;