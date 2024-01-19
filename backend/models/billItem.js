const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bill = require('./bill');

const billItemSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number,
    bill: {
        type: Schema.Types.ObjectId,
        ref: 'Bill'
    }
});

module.exports = mongoose.model('BillItem', billItemSchema);
