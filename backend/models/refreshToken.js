const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');

const refreshTokenSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    status: {
        type: string,
        enum: ['issued', 'claimed', 'terminated'],
        required: true
    }
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);