const express = require('express');
const router = express.Router();

const db = require('../config/db');

client = db.getDBClient();

router.get('/barTransaction', async (req, res) => {
  const { month } = req.query;

  try {
    const db = client.db("myDatabase");
    const collection = db.collection("myCollection");

    const monthMapping = {
        'January': '01',
        'February': '02',
        'March': '03',
        'April': '04',
        'May': '05',
        'June': '06',
        'July': '07',
        'August': '08',
        'September': '09',
        'October': '10',
        'November': '11',
        'December': '12'
      };

    const filter = {};
    if (month) {
        const monthNumber = monthMapping[month];
        filter.dateOfSale = new RegExp(`^\\d{4}-${monthNumber}`, 'i');
    }

    const transactions = await collection.find(filter).toArray();

    let response = {
        '0-100': 0,
        '101-200': 0,
        '201-300': 0,
        '301-400': 0,
        '401-500': 0,
        '501-600': 0,
        '601-700': 0,
        '701-800': 0,
        '801-900': 0,
        '901 and above': 0
      };
  
      transactions.forEach(transaction => {
        if (transaction.price >= 0 && transaction.price <= 100) response['0-100']++;
        else if (transaction.price >= 101 && transaction.price <= 200) response['101-200']++;
        else if (transaction.price >= 201 && transaction.price <= 300) response['201-300']++;
        else if (transaction.price >= 301 && transaction.price <= 400) response['301-400']++;
        else if (transaction.price >= 401 && transaction.price <= 500) response['401-500']++;
        else if (transaction.price >= 501 && transaction.price <= 600) response['501-600']++;
        else if (transaction.price >= 601 && transaction.price <= 700) response['601-700']++;
        else if (transaction.price >= 701 && transaction.price <= 800) response['701-800']++;
        else if (transaction.price >= 801 && transaction.price <= 900) response['801-900']++;
        else response['901 and above']++;
      });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching transactions');
  }
});

module.exports = router;
