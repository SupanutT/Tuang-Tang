const receiptOcrEndpoint = 'https://ocr.asprise.com/api/v1/receipt';
const imageUrl = 'https://res.cloudinary.com/dgwfiyuty/image/upload/v1705516731/tuang-tang/fxlafxtfga631navcyfx.jpg';
const localFilePath = 'localImage.jpg';

const axios = require('axios');
const fs = require('fs');
const request = require('request-promise-native');
const { cleanData } = require('../utils/cleanData');
const { data } = require('./data');

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

            fileStream.on('error', (err) => {
                console.error(`Error writing to file: ${err.message}`);
                reject(err);
            });

            fileStream.on('finish', async () => {
                console.log('Download complete');
                await delay(15000); // wait 15 seconds for getting the file path
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
        console.log(ocrResult.receipts[0]);
        const items = ocrResult.receipts[0].items;
        const cleanedData = cleanData(items);
        return cleanedData;
    } catch (error) {
        console.error(error);
        console.log("error");
        return cleanData(data);
    }
};

module.exports = getItemDetail;
