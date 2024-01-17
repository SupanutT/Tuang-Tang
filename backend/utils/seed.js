const mongoose = require('mongoose');
const Bill = require('../models/bill');

mongoose.connect('mongodb://127.0.0.1:27017/tuang-tang', {});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const seedDb = async () => {
    await Bill.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const name = `This is bill no. ${i}`;
        const date = new Date();
        const bill = new Bill({
            name: name,
            date: date,
            image: {
                filename: 'image name',
                url: 'https://source.unsplash.com/random'
            }
        });
        await bill.save();
    }
    console.log('SEEDING DONE!');
};

seedDb().then(() => {
    mongoose.connection.close();
    console.log('Database disconnected');
});
