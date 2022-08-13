const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const postgresql = require('../database/postgres.js');

postgresql();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

//example query:
//app.get('some endpoint', async (req, res) => {
// const yourData = await.process.postgresql.query(
  // 'Your query here;'
// )
// res.status(200).send(JSON.stringify(yourData))
// })