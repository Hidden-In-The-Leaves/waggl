/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const db = require('../database/postgres');
const accountSettingsRoutes = require('./routes/accountSettingsRoutes');
const packsRoutes = require('./routes/packsRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const testRoutes = require('./routes/testRoutes');

dotenv.config();

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('DB connected');
  }
});
app.use(express.json());
const socketRouter = require('./routes/socketRouter')(io);

const messageRoutes = require('./routes/messageRoutes');

app.use(express.static(path.join(__dirname, '../dist')));
app.use(cors());
app.use('/api/message', () => socketRouter());
app.use('/api/messages', messageRoutes);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/api/accountSettings', accountSettingsRoutes);
app.use('/api/packs', packsRoutes);
app.use('/api/events', eventsRoutes);
// for test
app.use('/api/test', testRoutes);

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// example query:
// app.get('some endpoint', async (req, res) => {
// const yourData = await.process.postgresql.query(
// 'Your query here;'
// )
// res.status(200).send(JSON.stringify(yourData))
// })
