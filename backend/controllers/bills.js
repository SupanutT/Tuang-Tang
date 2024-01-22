const Bill = require('../models/bill');
const getItemDetail = require('../receipt-ocr/index');

module.exports.showBill = async (req, res, next) => {
    const bill = await Bill.findById(req.params.id);
    const { id, owner, ...data } = bill.toJSON(); // Destructure owner field
    res.send(data);
};

module.exports.showAllBill = async (req, res, next) => {
    const bills = await Bill.find().populate({
        path: 'owner',
        select: 'name'
    });

    const data = bills.map(bill => {
        const { id, owner, ...restOfBill } = bill.toJSON(); // Destructure owner field
        return {
            ...restOfBill,
            owner_name: bill.owner_name
        };
    });
    res.send(data);
    // const itemDetail = await getItemDetail();
};

module.exports.createBill = async (req, res, next) => {
    const bill = new Bill({ ...req.body.bill, date: new Date() });
    try {
        bill.image = { filename: req.file.filename, url: req.file.path };
    } catch (e) {
        console.error(e);
        return res.send('Image is NOT uploaded. Please try again!');
    }
    await bill.save();
    res.send(bill._id);
};

