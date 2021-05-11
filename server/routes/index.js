const express = require("express");
const router = express.Router();

const { 
    handleLogin, 
    handleRegister, 
    handleLogout 
} = require('../controllers/auth.controller');

const loggedInOnly = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else res.json({message: 'not authenticated'});
};

const loggedOutOnly = (req, res, next) => {
    if (req.isUnauthenticated()) {
        next();
    }
    else res.json({ message: 'authenticated' });
};

module.exports = (passport) => {

    router.post('/login', passport.authenticate('local-login'), handleLogin);

    router.post('/register', passport.authenticate('local-register'), handleRegister);

    router.get('/logout', handleLogout);

    router.use((err, req, res) => {
        console.error(err.stack);
        res.status(500).end(err.stack);
    });

    return router;
};