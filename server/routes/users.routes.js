const express = require("express");
const router = express.Router();
const { handleGetAllUsers } = require('../controllers/users.controller');

const loggedInOnly = (req, res, next) => {
    if (req.user) {
        console.log('auth yes');
        next();
    }
    else {

        console.log('auth no');
        console.log(req.session);
        res.json({ message: 'not authenticated' });
    } 
};

const loggedOutOnly = (req, res, next) => {
    if (req.isUnauthenticated()) {
        next();
    }
    else res.json({ message: 'authenticated' });
};

router.get('/users' ,handleGetAllUsers);
// router.get('/users', loggedInOnly ,handleGetAllUsers);

module.exports = router;