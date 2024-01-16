const express = require('express');
const cors = require('cors');
const FetchJSONApiRoute = require('./Route/FetchJSONApiRoute');

const app = express();

app.listen(80, () => console.log('Listening to PORT 800'));

app.use(cors());
app.use('/', FetchJSONApiRoute);
app.use('/home', (req, res) => {
    res.send('HI!');
});
