// const express = require("express");
const db = require('../../database/postgres.js');
// const { getMessage } = require("../controllers/messageController.js");

// const router = express.Router();

const users = [];
const socketRouter = (io) => {
  io.on('connection', (socket) => {
    socket.on('user_connected', (user) => {
      users[user.email] = socket.id;
      io.emit('user_connected', user);
    });
    socket.on('send_private_message', (message) => {
      console.log('pm', message);
      socket.to(users[message.to]).emit('receive_message', message);
    });
    socket.on('join_room', (roomName) => {
      console.log(`User ${socket.id} join ${roomName}`);
      socket.join(roomName);
    });
    socket.on('send_group_message', (message) => {
      socket.to(message.roomName).emit('receive_message', message);
    });
  });
};
// router.route("/").get(getMessage);

// module.exports = router;
module.exports = socketRouter;
