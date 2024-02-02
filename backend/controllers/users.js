const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports.register = async (req, res) => {
    try {
        const { username, email, password, name } = req.body;
        const user = new User({ email, username, name });
        const registeredUser = await User.register(user, password);
        const userId = registeredUser._id;
        const accessToken = jwt.sign({ id: userId.toString() }, 'your-secret-key', { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: userId.toString() }, 'refresh-secret', { expiresIn: '7d' });
        const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
        await RefreshToken.create({ userId: userId, refreshToken: hashedRefreshToken, status: 'issued' });
        res.status(200).send({ message: "Registered successfully!", accessToken: accessToken, refreshToken: refreshToken, expiredIn: 15 * 60 });
    } catch (e) {
        res.send(e);
    }
};

module.exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    const accessToken = jwt.sign({ id: user._id.toString() }, 'your-secret-key', { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id.toString() }, 'refresh-secret', { expiresIn: '7d' });
    const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
    await RefreshToken.create({ userId: user._id, refreshToken: hashedRefreshToken, status: 'issued' });
    res.status(200).json({ message: "Logged in successfully!", accessToken: accessToken, refreshToken: refreshToken, expiredIn: 15 * 60 });
};

module.exports.refreshToken = async (req, res) => {
    const hashedRefreshToken = crypto.createHash('sha256').update(req.body.refreshToken).digest('hex');
    const refreshToken = await RefreshToken.findOne({ refreshToken: hashedRefreshToken });
    const userId = refreshToken.userId;
    if (refreshToken && refreshToken.status === 'issued') {
        refreshToken.status = 'claimed';
        await refreshToken.save();
        const newAccessToken = jwt.sign({ id: userId.toString() }, 'your-secret-key', { expiresIn: '15m' });
        const newRefreshToken = jwt.sign({ id: userId.toString() }, 'refresh-secret', { expiresIn: '7d' });
        const newHashedRefreshToken = crypto.createHash('sha256').update(newRefreshToken).digest('hex');
        await RefreshToken.create({ userId: userId, refreshToken: newHashedRefreshToken, status: 'issued' });
        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken, expiredIn: 15 * 60 });
    } else if (refreshToken && refreshToken.status === 'claimed') {
        const refreshTokens = await RefreshToken.updateMany({ id: userId }, { $set: { status: 'terminated' } });
        // TODO - find all refreshToken related to this id and terminate them all
        res.status(403).json({ message: 'Session is already used by another user, please change the password immediately.' });
    } else {
        res.status(403).json({ message: 'Session is ended, please log-in again.' });
    }
};

module.exports.logout = async (req, res) => {
    const hashedRefreshToken = crypto.createHash('sha256').update(req.body.refreshToken).digest('hex');
    const refreshToken = await RefreshToken.findOne({ refreshToken: hashedRefreshToken });
    if (refreshToken) {
        refreshToken.status = 'terminated';
        refreshToken.save();
        res.status(200).json({ message: 'Logged out successfully!' });
    }
    res.status(404).json({ message: 'refresh token not found' });
};