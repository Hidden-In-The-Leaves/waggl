const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config()
const db = require('../database/postgres.js');
// const messageRoutes = require('./routes/messageRoutes.js');
const packsRoutes = require('./routes/packsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("DB connected");
  }
});

// db.query('select * from users')
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// app.use('/api/message', messageRoutes);
app.use('/api/packs', packsRoutes);
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

//example query:
//app.get('some endpoint', async (req, res) => {
// const yourData = await.process.postgresql.query(
  // 'Your query here;'
// )
// res.status(200).send(JSON.stringify(yourData))
// })
