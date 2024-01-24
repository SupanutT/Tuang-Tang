const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');

const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } };

const billItemSchema = new Schema({
    menu: String,
    price: Number,
    quantity: Number,
    dividers: [String]
});

const billSchema = new Schema({
    name: String,
    date: Date,
    image: {
        filename: String,
        url: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    all_dividers: [String],
    billItems: [billItemSchema]
}, opts);

billSchema.virtual('owner_name', {
    ref: 'User',
    localField: 'owner',
    foreignField: '_id',
    justOne: true,
    get: function () {
        return this.owner.name;
    },
});

billSchema.set('toObject', { virtuals: true });
billSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Bill', billSchema);
