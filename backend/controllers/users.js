const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const crypto = require('crypto');

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
    const accessToken = jwt.sign({ id: user._id.toString() }, 'your-secret-key', { expiresIn: '1m' });
    const refreshToken = jwt.sign({ id: user._id.toString() }, 'refresh-secret', { expiresIn: '7d' });
    const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
    await RefreshToken.create({ userId: user._id, refreshToken: hashedRefreshToken, status: 'issued' });
    // res.cookie('access_token', token, {
    //     httpOnly: true,
    //     maxAge: 60 * 1000, // Expires in 1 hour (in milliseconds)
    //     // sameSite: 'strict',
    //     // path: '/',
    // });
    res.json({ message: "Logged in successfully!", accessToken: accessToken, refreshToken: refreshToken, expiredIn: 60 });
};

module.exports.refreshToken = async (req, res) => {
    console.log(req.body.refreshToken);
    const hashedRefreshToken = crypto.createHash('sha256').update(req.body.refreshToken).digest('hex');
    const refreshToken = await RefreshToken.findOne({ refreshToken: hashedRefreshToken });
    console.log(refreshToken);
    const userId = refreshToken.userId;
    if (refreshToken && refreshToken.status === 'issued') {
        refreshToken.status = 'claimed';
        await refreshToken.save();
        const newAccessToken = jwt.sign({ id: userId }, 'your-secret-key', { expiresIn: '1m' });
        const newRefreshToken = jwt.sign({ id: userId }, 'refresh-secret', { expiresIn: '7d' });
        const newHashedRefreshToken = crypto.createHash('sha256').update(newRefreshToken).digest('hex');
        await RefreshToken.create({ userId: userId, refreshToken: newHashedRefreshToken, status: 'issued' });
        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken, expiredIn: 60 });
    }
};

module.exports.logout = async (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.json({ message: 'Logged out successfully!' });
};