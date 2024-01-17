const Bill = require('../models/bill');

module.exports.showBill = async (req, res, next) => {
    const bill = await Bill.findById(req.params.id);
    res.send({ bill });
};

module.exports.createBill = async (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    res.send(req.body);
    // const bill = new Bill(req.body.bill);
    // res.send({ bill });
};
