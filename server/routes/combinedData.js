const express = require('express');
const router = express.Router();
const axios = require('axios');

const db = require('../config/db');

client = db.getDBClient();

router.get('/combinedData', async (req, res) => {

  const { month } = req.query;

    try {
      const urls = [`http://localhost:3000/transaction/statTransaction?month=${ month }`, `http://localhost:3000/transaction/barTransaction?month=${ month }`, `http://localhost:3000/transaction/pieTransaction?month=${ month }`];
  
      const apiPromises = urls.map(url => axios.get(url));
      const apiResponses = await Promise.all(apiPromises);
  
      const data = apiResponses.map(response => response.data);
  
      const response = Object.assign({}, ...data);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching transactions');
  }
});

module.exports = router;
