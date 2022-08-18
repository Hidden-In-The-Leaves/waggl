/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const db = require('../database/postgres');
const accountSettingsRoutes = require('./routes/accountSettingsRoutes');
// const messageRoutes = require('./routes/messageRoutes');
const packsRoutes = require('./routes/packsRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('DB connected');
  }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// app.use('/api/message', messageRoutes);
app.use('/api/accountSettings', accountSettingsRoutes);

app.use('/api/packs', packsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/user', userRoutes);

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// example query:
// app.get('some endpoint', async (req, res) => {
// const yourData = await.process.postgresql.query(
// 'Your query here;'
// )
// res.status(200).send(JSON.stringify(yourData))
// })
