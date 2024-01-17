const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const FetchJSONApiRoute = require('./route/FetchJSONApiRoute');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/tuang-tang', {});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

app.listen(80, () => console.log('Listening to PORT 80'));

app.use(cors());
app.use('/', FetchJSONApiRoute);
app.use('/home', (req, res) => {
    res.send('HI!');
});
