const User = require('../models/User');
const passport = require('passport');

exports.handleLogin = async (req, res, next) => {
    console.log('login()');
    console.log(req.body);

    passport.authenticate('local',
        (err, user, info) => {
            if (err) {
                console.log('err');
                return next(err);
            }

            if (!user) {
                console.log('!user');
                return res.status(200).json(info);
                // return res.redirect('login?info=' + info);
            }

            console.log('ok');
            // req.logIn(user, function (err) {
            //     if (err) {
            //         return next(err);
            //     }

            //     return res.redirect('/');
            // });

        })(req, res, next);

}

exports.handleRegister = async (req, res, next) => {
    console.log('register()');
    console.log(req.body);

    //check for duplicates
     const {email, password} = req.body;

    const newUser = new User({email, password});
    newUser.save((err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('success');
        console.log(result);
        return;
    });
}