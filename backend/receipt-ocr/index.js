const receiptOcrEndpoint = 'https://ocr.asprise.com/api/v1/receipt';
const imageUrl = 'https://res.cloudinary.com/dgwfiyuty/image/upload/v1705516731/tuang-tang/fxlafxtfga631navcyfx.jpg';
const localFilePath = 'localImage.jpg';

const axios = require('axios');
const fs = require('fs');
const request = require('request-promise-native'); // Use request-promise-native for promise-based requests

const getLocalFilePath = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: 'get',
                url: imageUrl,
                responseType: 'stream',
            });

            const fileStream = fs.createWriteStream(localFilePath);
            response.data.pipe(fileStream);

            // Handle errors during the download
            fileStream.on('error', (err) => {
                console.error(`Error writing to file: ${err.message}`);
                reject(err);
            });

            // Handle the completion of the download
            fileStream.on('finish', () => {
                console.log('Download complete');
                resolve(localFilePath);
            });
        } catch (error) {
            console.error(`Error downloading image: ${error.message}`);
            reject(error);
        }
    });
};

const getItemDetail = async () => {
    try {
        const resolvedLocalFilePath = await getLocalFilePath();
        const body = await request.post({
            url: receiptOcrEndpoint,
            formData: {
                client_id: 'TEST',
                recognizer: 'auto',
                ref_no: 'ocr_nodejs_123',
                file: fs.createReadStream(resolvedLocalFilePath),
            },
        });
        const ocrResult = JSON.parse(body);
        const items = ocrResult.items;
        // console.log(ocrResult.receipts[0].items);
        // //console.log(items); // Receipt OCR result in JSON
        // // console.log({ ...receipts });
        return ocrResult.receipts[0].items;
    } catch (error) {
        console.error(error);
        console.log("error");
        return "error";
    }
};


// const getItemDetail = async () => {
//     const localImagePath = await getLocalFilePath();
//     const imageBuffer = fs.readFileSync(localImagePath);
//     const base64String = imageBuffer.toString('base64');

//     const api = "https://apis.aigen.online/aiscript/general-invoice/v2";
//     const headers = {
//         "x-aigen-key": "SByvz2gaqnvxwpos939jb06ig97xofoxb5",
//     };
//     const data = { image: base64String };

//     axios
//         .post(api, data, { headers: headers })
//         .then((res) => {
//             console.log(res.data);
//         })
//         .catch((err) => {
//             console.error(err.response.data);
//         });

// };

module.exports = getItemDetail;
