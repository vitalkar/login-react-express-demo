const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.handleLogin = async (req, res, next) => {
    console.log('login()');
    console.log(req.body);
    const result = await User.find({});
    return res.status(200).json(result);
}

exports.handleRegister = async (req, res, next) => {
    console.log('register()');
    console.log(req.body);

    //check for duplicates
    const {email, password} = req.body;

    if (!email || !password) {
        console.log('empty email or password');
        return;
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log(err);
            return;
        }
        
        // Store hash in your password DB.
        const newUser = new User({ email, hash });
        
        newUser.save((err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('success');
            console.log(result);
            return;
        });
    });
}

exports.handleLogout = async (req, res, next) => {
    console.log('logout()');
    console.log(req.body);
    return req.status(200).json({});
}