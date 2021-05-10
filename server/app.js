
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('redis');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const cors = require('cors');
const { dbConnect } = require('./db');
const User = require('./models/User');
// const config = require('dotenv').config();

// const routes = require('./routes')(passport);
const app = express();
dbConnect();
// require('./config/passport')(passport);

// console.log(config);

//redis
// const redisStore = require('connect-redis')(session);
// const redisClient = redis.createClient();

const sessionOptions = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(session(sessionOptions));

//auth route
app.use('*', (req, res, next) => {
    console.log('base route catch');
    next();
})

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (userId, done) {
    User.findById(userId, (err, user) => done(err, user));
});

// Passport Local
const local = new LocalStrategy((email, password, done) => {
    User.findOne({ email })
        .then(user => {
            if (!user || !user.validPassword(password)) {
                done(null, false, { message: "Invalid username/password" });
            } else {
                done(null, user);
            }
        })
        .catch(e => done(e));
});
passport.use("local", local);

// Routes

app.use('/api', require('./routes')(passport));

app.listen(process.env.PORT || 3001, () => {
    console.log(`App Started on PORT ${process.env.PORT || 3001}`);
});

//TODO 
//add error handler
//add auyh route
