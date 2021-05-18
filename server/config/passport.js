// load passport module 
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// load up the user model 
const User = require('../models/User');

module.exports = (passport) => {
    // passport init setup 
    // serialize the user for the session 
    passport.serializeUser((user, done) => {
        console.log('serializeUser()');        
        console.log(user.id);
        done(null, user.id);
    });
    // deserialize the user 
    passport.deserializeUser((id, done) => {
        console.log('deserializeUser()');
        User.findById(id, (err, user) => done(err, user));
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
                if (!user) {
                    console.log(email, password);
                    console.log('failure: user not found')
                    done(null, false, { message: "user not found" });
                } else {
                    const hashedPassword = user.password;
                    const result = bcrypt.compareSync(password, hashedPassword);
                    if (!result) {
                        console.log('failure: Invalid email/password')
                        done(null, false, { result: "Invalid email/password" });
                    } else {
                        console.log('success')
                        done(null, user);
                    }
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
            if (email) {
                email = email.toLowerCase(); // format to lower-case 
            }
            // asynchronous 
            process.nextTick(() => {
                // if the user is not already logged in: 
                if (!req.user) {
                    User.findOne({ email },
                        async (err, user) => {
                            if (err) {
                                return done(err);
                            }
                            if (user) {
                                return done(null, false, {message : 'this email is already taken.'});
                            }
                            else {
                                password = bcrypt.hashSync(password, 12);
                                const newUser = new User({ email, password });
                                newUser.save((err) => {
                                    if (err) {
                                        throw err;
                                    }
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
