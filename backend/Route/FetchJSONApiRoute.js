const express = require('express');
const JSONDataFetch = require('../controller/FetchJSONApiController');
const router = express.Router();

router.get('/fetch-api-data', JSONDataFetch.FetchJSONAPIData); // API endpoint

module.exports = router;
