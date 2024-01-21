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
    try {
        bill.image = { filename: req.file.filename, url: req.file.path };
    } catch (e) {
        console.error(e);
        return res.send('Image is NOT uploaded. Please try again!');
    }
    await bill.save();
    res.json(({ success: true, message: `Data received successfully with bill_id = ${bill._id}` }));
};

