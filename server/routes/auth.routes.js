const express = require("express");
const router = express.Router();

const { 
    handleLogin, 
    handleRegister, 
    handleLogout 
} = require('../controllers/auth.controller');


module.exports = (passport) => {

    router.post('/login', (req, res, next) => {
        passport.authenticate('local-login', (err, user, info) => {

            if (err) {
                return res.status(500).json({message: 'something broke'})
            } else if (info) {
                return res.status(401).json({ message: 'unauthorized' })
            } else {
                
                req.login(user, (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'error login' })
                    } else {
                        req.user = user;
                        req.session.user = user;
                        return res.status(200).json(user)
                    }
                });
            }

        })(req, res, next);
    });

    router.post('/register', passport.authenticate('local-register'), handleRegister);

    router.get('/logout', (req, res, next) => {
        req.logout();
    });

    return router;
};