// load passport module 
const LocalStrategy = require('passport-local').Strategy;
// load up the user model 
const User = require('../models/User');

module.exports = (passport) => {
    // passport init setup 
    // serialize the user for the session 
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    // deserialize the user 
    passport.deserializeUser((email, done) => {
        User.findOne({ email }, (err, user) => done(err, user));
    });

    // using local strategy 
    passport.use('local-login', new LocalStrategy({

        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true

    }, (req, email, password, done) => {
        User.findOne({ email })
            .then((user) => {
                console.log(user);
                if (!user || !user.validPassword(password)) {
                    console.log('failure')
                    done(null, false, { message: "Invalid email/password" });
                } else {
                    console.log('success')
                    done(null, user);
                }
            })
            .catch(e => done(e));
    }));

    // register local strategy 
    passport.use('local-register', new LocalStrategy({
        // change default username and password, to email and 
        //  password 
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        (req, email, password, done) => {
            if (email)
                // format to lower-case 
                email = email.toLowerCase();
            // asynchronous 
            process.nextTick(() => {
                // if the user is not already logged in: 
                if (!req.user) {
                    User.findOne({ email },
                        (err, user) => {
                            // if errors 
                            if (err)
                                return done(err);
                            // check email 
                            if (user) {
                                return done(null, false, {message : 'this email is already taken.'});
                            }
                            else {
                                // create the user 
                                var newUser = new User();
                                // Get user name from req.body 
                                newUser.local.email = email;
                                newUser.local.password =
                                    newUser.generateHash(password);
                                // save data 
                                newUser.save((err) => {
                                    if (err)
                                        throw err;
                                    return done(null, newUser);
                                });
                            }
                        });
                } else {
                    return done(null, req.user);
                }
            });
        }));
};
