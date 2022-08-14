const express = require('express');
const messageController = require('../controllers/messageController.js');

const router = express.Router();

router.route('/')
  .get(messageController)
  .post('some controller')
  .put('some controller')

module.exports = router;