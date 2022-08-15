const express = require('express');
const messageController = require('../controllers/messageController.js');

const router = express.Router();

router.route('/')
  .get(messageController.getMessage);

module.exports = router;