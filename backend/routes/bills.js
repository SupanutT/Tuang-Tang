const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const bills = require('../controllers/bills');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router
    .route('/')
    .get(bills.showAllBill);
// .post(upload.single('image'), bills.createBill);
// .post()

router
    .route('/:id')
    .get(catchAsync(bills.showBill));
// .post({
//     url: receiptOcrEndpoint,
//     formData: {
//         client_id: 'TEST',
//         recognizer: 'auto',
//         ref_no: 'ocr_nodejs_123',
//         file: fs.createReadStream(imageFile)
//     },
// }, function (error, response, body) {
//     if (error) {
//         console.error(error);
//     }
//     console.log(body); // Receipt OCR result in JSON
// });

module.exports = router;
