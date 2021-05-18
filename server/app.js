
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const redis = require('redis');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const cors = require('cors');
const { dbConnect } = require('./db');
// const uuid = require('uuid/v4')
// const User = require('./models/User');
// const config = require('dotenv').config();

const app = express();
dbConnect();

//redis
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
    // genid: (req) => {
    //     console.log('Inside the session middleware');
    //     console.log(req.sessionID);
    //     return uuid(); // use UUIDs for session IDs
    // },
    secret: 'propats_secret',
    resave: false,
    saveUninitialized: true,
    // saveUninitialized: false,
    cookie: {
        secure: false, 
        httpOnly: false,
        maxAge: 60 * 60 * 1000 
    }, // 1 hour
    store: new RedisStore({
        host: '127.0.0.1',
        port: 6379,
        client: redisClient,
        ttl: 260
    }),
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
// Routes
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });
app.use((req, res, next) => {
    console.log('base route catch');
    console.log('sessionID', req.sessionID);
    console.log('req.session.passport: ', req.session.passport);
    console.log('req.user: ', req.user);
    console.log('req.session.user: ', req.session.user);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.isAuthenticated()) {
        console.log('isAuthenticated!!!');
    }
    if (req.isUnauthenticated()) {
        console.log('isUnAuthenticated X');
    }
    next();
})

app.use('/auth', require('./routes/auth.routes')(passport));
app.use('/api', require('./routes/users.routes'));

// router.use((err, req, res) => {
//     console.error(err.stack);
//     res.status(500).end(err.stack);
// });

app.listen(process.env.PORT || 3001, () => {
    console.log(`App Started on PORT ${process.env.PORT || 3001}`);
});

//TODO 
//add error handler
//add auyh route
//logout handle
//refresh handle