const express = require('express');
const accountSettingsController = require('../controllers/messageController.js');

const router = express.Router();

router.route('/')
  .put(accountSettingsController)

module.exports = router;