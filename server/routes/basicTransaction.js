const express = require('express');
const router = express.Router();

const db = require('../config/db');

client = db.getDBClient();

router.get('/basicTransaction', async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;

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
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { price: new RegExp(search, 'i') }
      ];
    }

    const transactions = await collection.find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .toArray();

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching transactions');
  }
});

module.exports = router;
