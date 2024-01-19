var receiptOcrEndpoint = 'https://ocr.asprise.com/api/v1/receipt';
var imageUrl = 'https://res.cloudinary.com/dgwfiyuty/image/upload/v1705516731/tuang-tang/fxlafxtfga631navcyfx.jpg'; // Modify this to use your own file if necessary
const localFilePath = 'localImage.jpg';

const axios = require('axios');
// request('http://fromrussiawithlove.com/baby.mp3').pipe(fs.createWriteStream('song.mp3'));

var fs = require('fs');
var request = require('request');
axios({
    method: 'get',
    url: imageUrl,
    responseType: 'stream',
})
    .then(response => {
        const fileStream = fs.createWriteStream(localFilePath);
        response.data.pipe(fileStream);

        // Handle errors during the download
        fileStream.on('error', (err) => {
            console.error(`Error writing to file: ${err.message}`);
        });

        // Handle the completion of the download
        fileStream.on('finish', () => {
            console.log(`Download complete: `);
        });


    });

request.post({
    url: receiptOcrEndpoint,
    formData: {
        client_id: 'TEST',
        recognizer: 'auto',
        ref_no: 'ocr_nodejs_123',
        file: fs.createReadStream(localFilePath)
    },
}, function (error, response, body) {
    if (error) {
        console.error(error);
    }
    console.log(body); // Receipt OCR result in JSON
});

// request.post({
//     url: receiptOcrEndpoint,
//     formData: {
//         client_id: 'TEST',
//         recognizer: 'auto',
//         ref_no: 'ocr_nodejs_123',
//         file: file
//     },
// }, function (error, response, body) {
//     if (error) {
//         console.error(error);
//     }
//     console.log(body); // Receipt OCR result in JSON
// });