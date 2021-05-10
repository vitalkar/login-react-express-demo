const express = require('express');
const router = express.Router();
const passport = require('passport');
// const {getAppRoot} = require('../utils');
const { handleLogin, handleRegister } = require('../controllers/auth.controller');

// const User = require('../models/User');

// router.get('/', async (req, res, next) => {
//     //
//     let result;

//     // console.log(result);
//     return res.status(200).json(result);
// });

// router.get('/login', (req, res, next) => {
//     User.login();
//     return res.status(200).json({});
// });

router.post(
    '/login', 
    handleLogin
);

router.post(
    '/register', 
    handleRegister
);

module.exports = router;