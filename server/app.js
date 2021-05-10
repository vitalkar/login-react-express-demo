
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('redis');
const passport = require('passport');
const cors = require('cors');
const routesHandler = require('./routes');
const User = require('./models/User');

const app = express();
//redis
// const redisStore = require('connect-redis')(session);
// const redisClient = redis.createClient();

const sessionOptions = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
};

// app.use(session({ 
//     secret: 'dog cat', 
//     saveUninitialized: true, 
//     resave: true,
//     store: new redisStore({ 
//         host: 'localhost', 
//         port: 6379, 
//         client: redisClient,
//         ttl: 260 
//     }),
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//auth
app.use('*', (req, res, next) => {
    console.log('base route catch');
    next();
})

app.use('/api', routesHandler);

app.listen(process.env.PORT || 3001, () => {
    // console.log(__dirname);
    console.log(`App Started on PORT ${process.env.PORT || 3001}`);
});

//TODO 
//add error handler
//add auyh route
