const Bill = require('../models/bill');
const User = require('../models/user');
const getItemDetail = require('../receipt-ocr/index');

module.exports.showBill = async (req, res, next) => {
    const bill = await Bill.findById(req.params.id).populate({
        path: 'owner',
        select: 'name'
    });
    const { id, owner, ...data } = bill.toJSON();
    res.status(200).json({ message: `Found one with id : ${req.params.id}`, ...data });
};

module.exports.showAllBill = async (req, res, next) => {
    // const;



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
};

module.exports.testOcr = async (req, res, next) => {
    const itemDetail = await getItemDetail();
    console.log(itemDetail);
    res.send(itemDetail);

};

module.exports.createBill = async (req, res, next) => {
    const bill = new Bill({ ...req.body.bill, date: new Date() });
    // const userId = req.user.id;
    const userId = "65ae9d6147bebe18165a9c9e";
    const { name } = User.findById(userId);
    try {
        bill.image = { filename: req.file.filename, url: req.file.path };
    } catch (e) {
        console.error(e);
        return res.send('Image is NOT uploaded. Please try again!');
    }
    const itemDetail = await getItemDetail();
    bill.owner = userId;
    bill.all_dividers = [];
    itemDetail.map((item) => {
        bill.billItems.push({ ...item, dividers: [name] });
    });
    await bill.save();
    res.send(bill._id);
};

module.exports.updateBill = async (req, res, next) => {
    const { id } = req.params;
    const { data } = req.body;
    const { billItems, restOfData } = data;
    const bill = await Bill.findByIdAndUpdate(id, { ...restOfData });
    bill.billItems = [];
    data.billItems.map((item) => {
        const { _id, ...restOfItem } = item;
        bill.billItems.push({ ...restOfItem });
    });
    await bill.save();
    res.send(data.billItems);
    // res.send(updatedBill);


};