const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const db = require('./config/db');

app.use(cors());

const dbRoutes = require('./routes/dbRoutes');
const basicTransaction = require('./routes/basicTransaction');
const statTransaction = require('./routes/statTransaction');
const barTransaction = require('./routes/barTransaction');
const pieTransaction = require('./routes/pieTransaction');
const combinedData = require('./routes/combinedData');

(async () => {
  try {
    await db.connectToDB();
    app.use('/api', dbRoutes);
    app.use('/transaction', basicTransaction);
    app.use('/transaction', statTransaction);
    app.use('/transaction', barTransaction);
    app.use('/transaction', pieTransaction);
    app.use('/transaction', combinedData);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
  }
})();
