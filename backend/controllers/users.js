const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
    try {
        const { username, email, password, name } = req.body;
        const user = new User({ email, username, name });
        const registeredUser = await User.register(user, password);
        res.send(registeredUser);
    } catch (e) {
        res.send(e);
    }
};

module.exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    console.log(req.body.username);
    console.log(user._id.toString());
    const token = jwt.sign({ id: user._id.toString() }, 'your-secret-key', { expiresIn: '1h', httpOnly: true });
    res.cookie('token', token, { expiresIn: '3m' });
    res.json({ message: "Logged in successfully!", token });
};


module.exports.logout = async (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.json({ message: 'Logged out successfully!' });
};