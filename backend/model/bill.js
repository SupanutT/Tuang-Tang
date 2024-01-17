const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    name: String,
    date: Date,
    image_url: String
});

module.exports = mongoose.model('Bill', billSchema);
