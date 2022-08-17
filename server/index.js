const express = require('express');
const path = require('path');
// const dotenv = require('dotenv');
// const db = require('../database/postgres');
// const messageRoutes = require('./routes/messageRoutes');
const accountSettingsRoutes = require('./routes/accountSettingsRoutes');

// dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

/* db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('DB connected');
  }
}); */

app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// app.use('/api/message', messageRoutes);
app.use('/api/accountSettings', accountSettingsRoutes);

/* app.get('/api/accountSettings/userInfo', (req, res) => {
  const data = {
    first_name: 'John',
    last_name: 'Smith',
    email: 'jsmith@gmail.com',
  };
  res.send(data);
});

app.get('/api/accountSettings/locationInfo', (req, res) => {
  const data = {
    city: 'Chicago',
    state: 'Illinois',
    discovery_radius: '5 miles',
  };
  res.send(data);
});

app.get('/api/accountSettings/privacySettings', (req, res) => {
  const data = {
    pack_sharing: true,
    location_sharing: true,
  };
  res.send(data);
}); */

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// example query:
// app.get('some endpoint', async (req, res) => {
// const yourData = await.process.postgresql.query(
// 'Your query here;'
// )
// res.status(200).send(JSON.stringify(yourData))
// })
