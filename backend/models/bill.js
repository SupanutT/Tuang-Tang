const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    name: String,
    date: Date,
    image: {
        filename: String,
        url: String
    }
});

module.exports = mongoose.model('Bill', billSchema);
