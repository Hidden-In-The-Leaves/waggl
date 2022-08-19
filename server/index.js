/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

const db = require('../database/postgres');
const accountSettingsRoutes = require('./routes/accountSettingsRoutes');
const packsRoutes = require('./routes/packsRoutes');
const userRoutes = require('./routes/userRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const testRoutes = require('./routes/testRoutes');
const socketRouter = require('./routes/socketRouter')(io);
const messageRoutes = require('./routes/messageRoutes');
const videoRoutes = require('./routes/videoRoutes');
const profileRoutes = require('./routes/profileRoutes');

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('DB connected');
  }
});
app.use(express.json());
// const socketRouter = require('./routes/socketRouter')(io);

app.use(express.static(path.join(__dirname, '../dist')));
app.use('/api/message', () => socketRouter());
app.use('/api/messages', messageRoutes);
// app.use('/api/message', () => socketRouter());

app.use('/api/accountSettings', accountSettingsRoutes);
app.use('/api/packs', packsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/user', userRoutes);
// for test
app.use('/api/test', testRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/profile', profileRoutes);

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// example query:
// app.get('some endpoint', async (req, res) => {
// const yourData = await.process.postgresql.query(
// 'Your query here;'
// )
// res.status(200).send(JSON.stringify(yourData))
// })
