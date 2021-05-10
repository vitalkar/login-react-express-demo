const mongoose = require('mongoose');

const connectStr = 'mongodb://localhost:27017/login-react-express-demo-db';

const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
};

exports.dbConnect = () => {
    mongoose.connect(connectStr, options);
    //Get the default connection
    const db = mongoose.connection;
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    db.once('open', function () {
        console.log('database connected');
    });
    return db; 
};