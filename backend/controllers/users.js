const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

module.exports.register = async (req, res) => {
    try {
        const { username, email, password, name } = req.body;
        const user = new User({ email, username, name });
        const registeredUser = await User.register(user, password);
        res.send({ message: "Registered successfully!" });
    } catch (e) {
        res.send(e);
    }
};

module.exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    console.log(req.body.username);
    console.log(user._id.toString());
    const token = jwt.sign({ id: user._id.toString() }, 'your-secret-key', { expiresIn: 3600 * 1000 });
    res.cookie('access_token', token, {
        httpOnly: true,
        maxAge: 3600 * 1000, // Expires in 1 hour (in milliseconds)
        // sameSite: 'strict',
        // path: '/',
    });
    res.json({ message: "Logged in successfully!", access_token: token, expires_in: 3600 * 1000 });
};


module.exports.logout = async (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.json({ message: 'Logged out successfully!' });
};