const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.handleLogin = async (req, res, next) => {

    if (req.user) {
        console.log(req.session.passport);
        console.log();
        // req.session.id = req.user._id;
        return res.status(200).json({result: req.user.email});
    } else {
        return res.status(404).json({result: 'user not found'});
    }
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
    return;
}

exports.handleLogout = async (req, res, next) => {
    console.log('logout()');
    console.log(req.body);
    return req.status(200).json({});
}
