if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoStore = require('connect-mongo');

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});


const User = require('./models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

/* api routes */
const billRoutes = require('./routes/bills');
const userRoutes = require('./routes/users');

const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ['https://www.tuang-tang.site'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(express.json());
app.use(cors(corsOptions));

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your-secret-key',
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    const user = { id: jwtPayload.id };
    return done(null, user);
}));

app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/index', (req, res) => {
    res.render('index.html');
});

app.use('/', userRoutes);
app.use('/bills/', billRoutes);

app.use('/testapi', (req, res) => {
    res.send('BACKEND SIDE!');
});

app.listen(80, () => console.log('Listening to PORT 80'));