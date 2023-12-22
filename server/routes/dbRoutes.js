const express = require('express');
const router = express.Router();
const axios = require('axios');

const db = require('../config/db');

client = db.getDBClient();

router.get('/initialize', async (req, res) => {
      
    try {
        // await client.connect();
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const info = response.data;
        await client.db("myDatabase").collection("myCollection").deleteMany({});
        const result = await client.db("myDatabase").collection("myCollection").insertMany(info);
        const totalDocuments = await client.db("myDatabase").collection("myCollection").countDocuments();
        res.status(200).send(`${result.insertedCount} documents were inserted. There are ${totalDocuments} total documents now`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error initializing the database');
    } finally {
        await client.close();
    }
});

module.exports = router;