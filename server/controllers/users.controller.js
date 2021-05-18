const User = require('../models/User');

exports.handleGetAllUsers = async (req, res, next) => {    
    //check session id

    console.log('handleGetAllUsers()');
    const result = await User.find({});
    return res.status(200).json(result);
}

