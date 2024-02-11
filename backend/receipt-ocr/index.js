const receiptOcrEndpoint = 'https://ocr.asprise.com/api/v1/receipt';

const axios = require('axios');
const fs = require('fs');
const request = require('request-promise-native');
const { cleanData } = require('../utils/cleanData');
const { data } = require('./data');

const getLocalFilePath = async (filename, url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: 'get',
                url: url,
                responseType: 'stream',
            });

            const fileStream = fs.createWriteStream(filename);
            response.data.pipe(fileStream);

            fileStream.on('error', (err) => {
                console.error(`Error writing to file: ${err.message}`);
                reject(err);
            });

            fileStream.on('finish', async () => {
                console.log('Download complete');
                resolve(filename);
            });
        } catch (error) {
            console.error(`Error downloading image: ${error.message}`);
            reject(error);
        }
    });
};

const getItemDetail = async (filename, url) => {
    try {
        const resolvedLocalFilePath = await getLocalFilePath(filename, url);
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
        const merchantName = ocrResult.receipts[0].merchant_name;
        const cleanedData = cleanData(items);
        return { cleanedData, merchantName };
    } catch (error) {
        console.error(error);
        console.log("error");
        const cleanedData = cleanData(data);
        return { cleanedData, merchantName: "ชื่อร้านอาหาร" };
    }
};

module.exports = getItemDetail;
