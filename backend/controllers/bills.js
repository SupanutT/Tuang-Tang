const Bill = require('../models/bill');

module.exports.showBill = async (req, res, next) => {
    const bill = await Bill.findById(req.params.id);
    res.send({ bill });
};

module.exports.showAllBill = async (req, res, next) => {
    const bills = await Bill.find();
    res.send({ bills });
};

module.exports.createBill = async (req, res, next) => {
    const bill = new Bill({ ...req.body.bill, date: new Date() });
    bill.image = { filename: req.file.filename, url: req.file.path };
    await bill.save();
    res.send(bill._id);
};

