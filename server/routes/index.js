const express = require("express");
const router = express.Router();

const { 
    handleLogin, 
    handleRegister, 
    handleLogout 
} = require('../controllers/auth.controller');

// const User = require('../models/User');

module.exports = (passport) => {
    router.post('/login', handleLogin);

    router.post('/register', handleRegister);

    router.get('/logout', handleLogout);

    return router;
};
// module.exports = router;