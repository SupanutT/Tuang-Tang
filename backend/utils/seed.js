// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/user');
const Bill = require('../models/bill');

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/tuang-tang';

mongoose.connect(dbUrl, {});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const seedDb = async () => {
    await Bill.deleteMany({});
    const user = await User.findById('65ae9d6147bebe18165a9c9e');
    const billItem1 = {
        menu: 'ข้าวสวย',
        price: 20,
        quantity: 2,
        dividers: ['admin', 'user1']
    };
    const billItem2 = {
        menu: 'ก๋วยเตี๋ยว',
        price: 50,
        quantity: 1,
        dividers: ['user1']
    };
    const billItem3 = {
        menu: 'พิซซ่า',
        price: 150,
        quantity: 1,
        dividers: ['admin', 'user1', 'user2']
    };

    const bill1 = new Bill({
        name: "Here Moo",
        date: new Date(),
        image: {
            filename: 'here moo 1',
            url: 'https://source.unsplash.com/random'
        },
        owner: user,
        dividers: ['user1', 'user2'],
        billItems: [billItem1, billItem2, billItem3]
    });
    const savedBill1 = await bill1.save();

    const bill2 = new Bill({
        name: "Here Kai",
        date: new Date(),
        image: {
            filename: 'here kai 1',
            url: 'https://source.unsplash.com/random'
        },
        owner: user,
        dividers: [],
        billItems: []
    });
    const savedBill2 = await bill2.save();

    const billItem4 = {
        menu: "ข้าวมันไก่",
        price: 50,
        quantity: 1,
        dividers: ["admin"]
    };

    const bill3 = new Bill({
        name: "Not Found",
        date: new Date(),
        image: {
            filename: 'not found',
            url: 'hhtps://source.unsplash.com/random'
        },
        owner: user,
        dividers: [],
        billItems: [billItem4]
    });
    await bill3.save();

    console.log('SEEDING DONE!');
};

seedDb().then(() => {
    mongoose.connection.close();
    console.log('Database disconnected');
});
