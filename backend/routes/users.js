const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');



router.post('/register', catchAsync(users.register));

router.post('/login', passport.authenticate('local', { session: false }), users.login);

router.get('/secret', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userId = req.user.id;
    console.log('User ID:', userId);
    res.send(`User ID: ${userId}, SECRET!`);

});

router.post('/logout', users.logout);

module.exports = router;