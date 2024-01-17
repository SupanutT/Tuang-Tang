const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const bills = require('../controllers/bills');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router
    .route('/')
    .post(upload.single('image'), (req, res) => {
        console.log(req.body, req.file);
        res.send(req.body);
    });

router
    .route('/:id')
    .get(catchAsync(bills.showBill));

module.exports = router;
