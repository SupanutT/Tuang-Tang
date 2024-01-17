if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

/* api routes */
const billRoutes = require('./routes/bills');

const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/tuang-tang';

mongoose.connect(dbUrl, {});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

app.listen(80, () => console.log('Listening to PORT 80'));
app.use(cors());
app.use('/home', (req, res) => {
    res.send('HI!');
});

app.use('/index', (req, res) => {
    res.render('index.html');
});

app.use('/bills/', billRoutes);
